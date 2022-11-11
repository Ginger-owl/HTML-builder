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
  
  fsPromises.readdir(folderPath, { withFileTypes: true})
  .then(files => files.forEach(file => {
    if (file.isDirectory()) {
      copyFolder(path.resolve(folderPath, file.name), path.resolve(CopyPath, file.name))
    } 
    if (file.isFile()) {
      fsPromises.copyFile(path.resolve(folderPath, file.name), path.resolve(CopyPath, file.name))
    }
  }))
}

copyFolder(folderPath, copyFolderPath)