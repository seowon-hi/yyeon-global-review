const fs = require('fs');
const content = fs.readFileSync('src/translations.ts', 'utf8');
const lines = content.split('\n');

// Line 151 (0-indexed 150) should be '개의 아이템'
// Wait,prettier shifted lines. Let's find it by context.
let newContent = content;
newContent = newContent.replace(/guest: "게스트 리비어",\s+items: "個のアイテム"/g, 'guest: "게스트 리비어",\n      items: "개의 아이템"');

fs.writeFileSync('src/translations.ts', newContent);
console.log('Fixed KO items');
