/* Импорт всех требуемых модулей
Прочтение и сохранение в переменной файла-шаблона
Нахождение всех имён тегов в файле шаблона
Замена шаблонных тегов содержимым файлов-компонентов
Запись изменённого шаблона в файл index.html в папке project-dist
Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css
Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist */

const fs = require('fs');
const path = require('path');

// path to resulting dir
const resultPath = path.resolve(__dirname, 'project-dist');

// path to styles
const stylesPartsPath = path.resolve(__dirname, 'styles');

//path to assets copy
const assetsPath = path.resolve(__dirname, 'assets');
const assetsCopyPath = path.resolve(resultPath, 'assets');

// stream to write styles and index files
const outputStyles = fs.createWriteStream(path.resolve(resultPath, 'style.css'));
const outputTemplate = fs.createWriteStream(path.resolve(resultPath, 'index.html'));

// Template
const templatePath = path.resolve(__dirname, 'template.html');
const componentsPath = path.resolve(__dirname, 'components');

// general pattern for templates
const generalPattern = /{{\w+}}/i;


// create project-dist
fs.mkdir(resultPath, { recursive:true }, err => {
  if (err) {
    console.log("Error", err);
  }
  //gather styles
  fs.readdir(stylesPartsPath,
    (err, files) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      files.forEach(file => {
        const fileType = path.extname(file);
          fs.stat(path.resolve(stylesPartsPath, file), (err, stats) => {
            if (err) {
              console.log("Error - ", err);
            } else {
              /* Проверка является ли объект файлом и имеет ли файл нужное расширение */
              if (stats.isFile() && fileType === '.css') {
                /* Чтение файла стилей */
                fs.readFile(path.resolve(stylesPartsPath, file), (err, data) => {
                  if (err) {
                    console.log("Error - ", err);
                    /* 5. Запись прочитанных стилей данных в в файл  */
                  } else {
                    outputStyles.write(data + "\n");
                  }
                })
              }
            }
          });
        })
      }
      console.log("+ Styles gathered together!")
  });
  
  // copy assests
  fs.mkdir(assetsCopyPath, { recursive:true }, err => {
    if (err) {
      console.log("Error", err);
    }
    fs.readdir(assetsPath,
      (err, dirs) => {
      if (err) {
        console.log("Error: ", err)
      } else {
        dirs.forEach(dir => {
            fs.mkdir(path.resolve(assetsCopyPath, dir), { recursive:true }, err => {
              if (err) {
                console.log("Error", err);
              }
            });
            fs.readdir(path.resolve(assetsPath, dir), (err, files) => {
              if (err) {
                console.log("Error: ", err)
              } else {
                files.forEach(file => {
                  fs.copyFile(path.resolve(assetsPath, dir, file), path.resolve(assetsCopyPath, dir , file), (err) => {
                    if (err) {
                      console.log("Error: ", err);
                    }
                  })
                })
              }
            })
          })
        }
      })
      console.log("+ Assests collected and up-to-date!")
    });
  })




// read
fs.readFile(templatePath, 'utf-8', (err, data) => {
if (err) {
  console.log("Error: ", err)
}
//let dataStr = data;
fs.readdir(componentsPath,
  (err, files) => {
    if (err) {
      console.log("Error: ", err)
    }
    files.forEach(file => {
      const name = file.split('.')[0];
      const pattern = new RegExp(`{{${name}}}`)
      //console.log(pattern);
      //console.log(pattern.test(data))
      if (pattern.test(data)) {
        //console.log('in')
        fs.readFile(path.resolve(componentsPath, file), (err, html) => {
          data = data.replace(pattern, html.toString());
          if (!generalPattern.test(data)) {
            outputTemplate.write(data);
            console.log("+ Page is ready!")

          }
        });
      }
    })
  })
});
  