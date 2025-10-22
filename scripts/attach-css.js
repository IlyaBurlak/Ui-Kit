const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const cssFile = './ui-kit.css';

function appendTo(file, content) {
  const p = path.join(dist, file);
  if (!fs.existsSync(p)) {
    console.warn('file not found:', p);
    return;
  }
  const data = fs.readFileSync(p, 'utf8');
  if (data.includes(content)) {
    console.log(file, 'already contains css import');
    return;
  }
  fs.writeFileSync(p, data + '\n' + content);
  console.log('appended css import to', file);
}

appendTo('index.mjs', `import '${cssFile}';`);
appendTo('index.cjs', `require('${cssFile}');`);

console.log('attach-css done');
