const fs = require('fs')

const inputFolder = '/data/inputs'
const outputFolder = '/data/outputs'

async function countrows(file) {
  console.log('Iniciando:  ' + file)
  var fileBuffer = fs.readFileSync(file)
  var toString = fileBuffer.toString()
  var splitLines = toString.split('\n')
  var rows = splitLines.length - 1
  fs.appendFileSync(outputFolder + '/output.log', file + ',' + rows + '\r\n')
  console.log('OK. Procesadas' + rows + ' lineas')
}

async function processfolder(folder) {
  var files = fs.readdirSync(folder)

  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    var fullpath = folder + '/' + file
    if (fs.statSync(fullpath).isDirectory()) {
      await processfolder(fullpath)
    } else {
      await countrows(fullpath)
    }
  }
}

processfolder(inputFolder)