const fs = require('fs');
const https = require('https');
const path = require('path');

const PROJECT_ID = '540679928313728097';
const API_KEY = process.env.STITCH_API_KEY || '';
const SCREENS_DIR = path.join(__dirname, 'generated_screens');
const METADATA_FILE = path.join(__dirname, 'screens_metadata.json');

if (!fs.existsSync(SCREENS_DIR)) {
  fs.mkdirSync(SCREENS_DIR, { recursive: true });
}

function callMcp(method, params = {}) {
  const data = JSON.stringify({
    jsonrpc: '2.0',
    id: Date.now() + Math.floor(Math.random() * 10000),
    method: 'tools/call',
    params: { name: method, arguments: params }
  });

  return new Promise((resolve, reject) => {
    const req = https.request('https://stitch.googleapis.com/mcp', {
      method: 'POST',
      timeout: 300000,
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out after 300s'));
    });
    req.write(data);
    req.end();
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} while downloading image`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', err => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function loadMetadata() {
  if (fs.existsSync(METADATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveMetadata(data) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function processScreen(screen, metadata) {
  const paddedId = String(screen.id).padStart(2, '0');
  const filename = `screen_${paddedId}.png`;
  const localPath = path.join(SCREENS_DIR, filename);

  if (metadata[screen.id] && metadata[screen.id].status === 'COMPLETE' && fs.existsSync(localPath)) {
    console.log(`[Screen ${screen.id}/33] Already generated and exists locally: ${filename}`);
    return;
  }

  console.log(`[Screen ${screen.id}/33] Generating with Stitch: "${screen.title}"...`);
  const tStart = Date.now();

  let res;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      res = await callMcp('generate_screen_from_text', {
        projectId: PROJECT_ID,
        prompt: screen.prompt,
        deviceType: 'MOBILE',
        modelId: 'GEMINI_3_FLASH'
      });

      if (res.error) {
        throw new Error(`Stitch error: ${res.error.message || JSON.stringify(res.error)}`);
      }
      break;
    } catch (err) {
      console.error(`[Screen ${screen.id}/33] Attempt ${attempt} failed:`, err.message);
      if (attempt === 2) throw err;
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  let screenObj = null;
  let summaryText = '';

  const components = res.result?.structuredContent?.outputComponents || [];
  for (const comp of components) {
    if (comp.text) summaryText += comp.text + '\n';
    if (comp.design?.screens?.[0]) {
      screenObj = comp.design.screens[0];
    }
  }

  if (!screenObj && res.result?.content?.[0]?.text) {
    try {
      const parsed = JSON.parse(res.result.content[0].text);
      if (parsed.outputComponents) {
        for (const comp of parsed.outputComponents) {
          if (comp.design?.screens?.[0]) screenObj = comp.design.screens[0];
        }
      }
    } catch (e) {}
  }

  const downloadUrl = screenObj?.screenshot?.downloadUrl;
  if (!downloadUrl) {
    throw new Error(`[Screen ${screen.id}/33] No screenshot downloadUrl found in Stitch response!`);
  }

  console.log(`[Screen ${screen.id}/33] Generated in ${(Date.now() - tStart)/1000}s. Downloading image...`);
  await downloadImage(downloadUrl, localPath);

  metadata[screen.id] = {
    id: screen.id,
    title: screen.title,
    stitchTitle: screenObj.title || screen.title,
    status: 'COMPLETE',
    screenName: screenObj.name,
    downloadUrl: downloadUrl,
    localFile: `generated_screens/${filename}`,
    summary: summaryText.trim(),
    generatedAt: new Date().toISOString()
  };

  saveMetadata(metadata);
  console.log(`[Screen ${screen.id}/33] Completed & saved to ${filename}!`);
}

async function run(startScreen = 1, endScreen = 33, concurrency = 2) {
  const prompts = JSON.parse(fs.readFileSync(path.join(__dirname, 'prompts.json'), 'utf8'));
  const metadata = loadMetadata();

  const targetScreens = prompts.filter(s => s.id >= startScreen && s.id <= endScreen);
  console.log(`Starting generation for screens ${startScreen} to ${endScreen} (concurrency: ${concurrency})...`);

  for (let i = 0; i < targetScreens.length; i += concurrency) {
    const chunk = targetScreens.slice(i, i + concurrency);
    await Promise.all(chunk.map(s => processScreen(s, metadata).catch(err => {
      console.error(`Error processing Screen ${s.id}:`, err.message);
    })));
  }

  console.log('All targeted screens processed!');
}

const args = process.argv.slice(2);
const start = parseInt(args[0]) || 1;
const end = parseInt(args[1]) || 33;
const conc = parseInt(args[2]) || 2;

run(start, end, conc).catch(console.error);
