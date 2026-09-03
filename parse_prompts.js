const fs = require('fs');

const content = fs.readFileSync('C:/Kisaansathi/prompts_all_33_screens.md', 'utf8');

const blocks = content.split(/### Screen /g).slice(1);
const screens = [];

for (const block of blocks) {
  const colonIdx = block.indexOf(':');
  const num = parseInt(block.substring(0, colonIdx).trim());
  
  const lineEndIdx = block.indexOf('\n', colonIdx);
  const title = block.substring(colonIdx + 1, lineEndIdx).trim();
  
  const promptStart = block.indexOf('```text');
  const promptEnd = block.indexOf('```', promptStart + 7);
  
  if (promptStart !== -1 && promptEnd !== -1) {
    const prompt = block.substring(promptStart + 7, promptEnd).trim();
    screens.push({
      id: num,
      title: title,
      prompt: prompt
    });
  }
}

console.log(`Successfully parsed ${screens.length} screens.`);
fs.writeFileSync('C:/Kisaansathi/prompts.json', JSON.stringify(screens, null, 2), 'utf8');
