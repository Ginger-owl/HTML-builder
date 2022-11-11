/* 1. Импорт всех требуемых модулей */
const fs = require('fs');
const path = require('path');


/* 2. Чтение содержимого папки **styles** */
const folderPath = path.resolve(__dirname, 'styles');
const resultPath = path.resolve(__dirname, 'project-dist');


const gatherStyles = async () => {
  const StyleFiles = await fs.promises.readdir(folderPath, {withFileTypes: true})
  const stylesStream = fs.createWriteStream(path.resolve(resultPath, 'bundle.css'));
  StyleFiles.forEach(async (style) => {
    // path.extname(style) === '.css'
    if(style.name.split('.')[1] === 'css') {
      fs.createReadStream(path.resolve(folderPath, style.name), 'utf8').addListener('data', data => {
        stylesStream.write(data + '\n');
      })
    }
  })
}

gatherStyles();

