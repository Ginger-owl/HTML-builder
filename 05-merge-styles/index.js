/* 1. Импорт всех требуемых модулей */
const fs = require('fs');
const path = require('path');


/* 2. Чтение содержимого папки **styles** */
const folderPath = path.resolve(__dirname, 'styles');
const resultPath = path.resolve(__dirname, 'project-dist');

const output = fs.createWriteStream(path.resolve(resultPath, 'bundle.css'));

fs.readdir(folderPath,
  (err, files) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    files.forEach(file => {
      const fileType = path.extname(file);
        fs.stat(path.resolve(folderPath, file), (err, stats) => {
          if (err) {
            console.log("Error - ", err);
          } else {
            /* 3. Проверка является ли объект файлом и имеет ли файл нужное расширение */
            if (stats.isFile() && fileType === '.css') {
              /* 4. Чтение файла стилей */
              fs.readFile(path.resolve(folderPath, file), (err, data) => {
                if (err) {
                  console.log("Error - ", err);
                  /* 5. Чтение стилей  */
                  /* 6. Запись прочитанных стилей в файл **bundle.css** */
                } else {
                  output.write(data + "\n");
                }
              })
            }
          }
        });
      })
    }
  console.log("Bundled!");
});
