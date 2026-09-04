const fs = require('fs');

function fixFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/ワ디즈/g, 'ワディ즈');
  content = content.replace(/[카カ]카오톡 相談/g, 'カカオトーク相談');
  content = content.replace(/home: "ホーム",\s+data: "데이터"/g, 'home: "ホーム",\n      data: "データ"');
  fs.writeFileSync(path, content);
}

fixFile('src/translations.ts');
fixFile('src/App.tsx');
console.log('Fixed');
