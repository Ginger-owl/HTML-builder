const path = require('path')
const fs = require('fs')

const folderPath = path.resolve(__dirname, 'secret-folder')

fs.readdir(folderPath,
  (err, files) => {
  if (err) {
    console.log("Error: ", err)
  } else {
    files.forEach(file => {
        fs.stat(path.resolve(folderPath, file), (err, stats) => {
          if (err) {
            console.log("Error - ", err)
          } else {
            if (stats.isFile()) {
              const fileName = file.split('.')[0];
              const fileType = path.extname(file).replaceAll('.','');
              const fileSize = stats.size / 1024;
              console.log(`${fileName} - ${fileType} - ${fileSize}kb`);
            }
          }
        });
      })
    }
  });