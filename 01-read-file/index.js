const fs = require('fs')
const path = require('path')

const input = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

input.on('data', (chunk) => process.stdout.write(chunk));
