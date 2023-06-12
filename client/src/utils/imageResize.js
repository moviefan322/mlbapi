const sharp = require('sharp');
const fs = require('fs');
const directory = '../assets/images/logos-optimized';

fs.readdirSync(directory).forEach(file => {
  sharp(`${directory}/${file}`)
    .resize(200, 100) // width, height
    .toFile(`${directory}/${file}-small.jpg`);
  });