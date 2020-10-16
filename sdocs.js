#!/usr/bin/env node
const fsp = require('fs').promises;
const fs = require('fs');
const glob = require("glob");
const program = require('./program')

const filepath = `${program.file}.md`

const options = {
  ignore: '**/node_modules/**'
}

const files = glob.sync("**/**.+(js|jsx|ts|tsx)", options)

const readFile = filename =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err)
      }

      const start = data.indexOf('/*sdoc')

      if (start <= -1 || start >= 10) {
        return resolve('')
      }

      const ends = data.indexOf('*/')

      resolve({
        filename,
        data: data.slice(start + 7, ends).trim()
      })
    })
  })

const readFiles = () =>
  Promise
    .all(files.map(readFile))
    .then(result => result.filter(Boolean))


function sanitizeIndexText({ filename }) {
  const sanitizedText = filename.replace(/\/|\./g, '').replace(/ /g, '-')

  return `[${filename}](#${sanitizedText})`
}

const parseDescription = filesData =>
  filesData
    .map(text => `#### ${text.filename}\n  ${text.data}`)
    .join('\n')

const parseIndex = filesData =>
  filesData
    .map(sanitizeIndexText)
    .join('\n') + '\n'


(async () => {
  const filesData = await readFiles()

  if (program.index) {
    await fsp.writeFile(filepath, parseIndex(filesData), 'utf8')
    await fsp.appendFile(filepath, parseDescription(filesData), 'utf8')
  } else {
    await fsp.writeFile(filepath, parseDescription(filesData), 'utf8')
  }
})();
