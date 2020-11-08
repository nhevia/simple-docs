#!/usr/bin/env node
const fsp = require('fs').promises
const fs = require('fs')
const glob = require('glob')
const command = require('./command/command')

const filepath = `${command.file}.md`

const options = {
  ignore: '**/node_modules/**'
}

const files = glob.sync('**/**.+(js|jsx|ts|tsx)', options)

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

const sanitizeIndexText = ({ filename }) => {
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
    .join('\n') + '\n';

(async () => {
  const filesData = await readFiles()

  if (command.index) {
    await fsp.writeFile(filepath, parseIndex(filesData), 'utf8')
    await fsp.appendFile(filepath, parseDescription(filesData), 'utf8')
  } else {
    await fsp.writeFile(filepath, parseDescription(filesData), 'utf8')
  }
})()

module.exports = {
  sanitizeIndexText,
  parseDescription,
  parseIndex
}
