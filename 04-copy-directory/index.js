const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises')

let folderPath = path.resolve(__dirname, 'files');
let copyFolderPath = path.resolve(__dirname, 'files-copy');

let copyFolder = async (folderPath, CopyPath) => {
  await fsPromises.rm(CopyPath, { recursive: true, force: true }, err => {
    if (err) {
      console.log("Error", err);
    }
  })

  await fsPromises.mkdir(CopyPath, { recursive: true }, err => {
    if (err) {
      console.log("Error", err);
    }
  })

  fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log("Error: ", err)
      } else {
        files.forEach(file => {
          fs.copyFile(path.resolve(folderPath, file), path.resolve(CopyPath, file), err => {
            if (err) {
              console.log("Error", err);
            }
          });
        })
      }
    });
}

copyFolder(folderPath, copyFolderPath)