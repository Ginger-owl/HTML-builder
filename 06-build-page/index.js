const fs = require('fs');
const path = require('path');


try {
  (async function() {
    // create result dir 
    await fs.promises.rm(path.resolve(__dirname, 'project-dist'), {recursive: true, force: true})
    await fs.promises.mkdir(path.resolve(__dirname,'project-dist'), {recursive: true})

    // gather styles to style.css
    const StyleFiles = await fs.promises.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true})
    const stylesStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'))
    StyleFiles.forEach(async (style) => {
      // path.extname(style) === '.css'
      if(style.name.split('.')[1] === 'css') {
        fs.createReadStream(path.resolve(__dirname, 'styles', style.name), 'utf8').addListener('data', data => {
          stylesStream.write(data);
        })
      }
    })

    // create html, from template n components 
    await fs.promises.copyFile(path.resolve(__dirname, 'template.html'), path.resolve(__dirname, 'project-dist', 'index.html'))

    let htmlData = await fs.promises.readFile(path.resolve(__dirname, 'project-dist', 'index.html'), 'utf8')

    const components = await fs.promises.readdir(path.resolve(__dirname, 'components'), {withFileTypes: true})
    components.forEach(async (file) => {
      const htmlFile = await fs.promises.readFile(path.resolve(__dirname, 'components', `${file.name}`))

      htmlData = htmlData.replace(`{{${file.name.split('.')[0]}}}`, htmlFile)

      await fs.promises.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), htmlData, err => {
        if (err) {
          console.log(err)
        }
      })
    })

    // copy assets to result dir
    // copy dir
    const copyFolder = async (folderPath, CopyPath) => {
      await fs.promises.rm(CopyPath, { recursive: true, force: true }, err => {
        if (err) {
          console.log("Error", err);
        }
      })
    
      await fs.promises.mkdir(CopyPath, { recursive: true }, err => {
        if (err) {
          console.log("Error", err);
        }
      })
      
      fs.promises.readdir(folderPath, { withFileTypes: true})
      .then(files => files.forEach(file => {
        if (file.isDirectory()) {
          copyFolder(path.resolve(folderPath, file.name), path.resolve(CopyPath, file.name))
        } 
        if (file.isFile()) {
          fs.promises.copyFile(path.resolve(folderPath, file.name), path.resolve(CopyPath, file.name))
        }
      }))
    }

    copyFolder(path.resolve(__dirname, 'assets'), path.resolve(__dirname, 'project-dist', 'assets'))
  })()
} catch (err) {
  console.log(err)
}
