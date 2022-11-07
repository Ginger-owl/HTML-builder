const path = require('path');
const fs = require('fs');

const folderPath = path.resolve(__dirname, 'files');
const folderCopyPath = path.resolve(__dirname, 'files-copy');

fs.stat(folderCopyPath, err => {
  if (!err) {
    console.log('Directory with copies exists, updating contents...')
  } else if (err.code === 'ENOENT') {
    console.log('Directory with copies does not exist - copying...')
    fs.mkdir(folderCopyPath, { recursive:true}, err => {
      if (err) {
        console.log("Error", err);
      }
    })
  }
})

fs.readdir(folderPath,
  (err, files) => {
  if (err) {
    console.log("Error: ", err)
  } else {
    files.forEach(file => {
      fs.copyFile(path.resolve(folderPath, file), path.join(folderCopyPath, file), (err) => {
        if (err) {
          console.log("Error: ", err);
        }
      })
    })
  }
  console.log("Finished!\nCopied files are up-to-date!")
});