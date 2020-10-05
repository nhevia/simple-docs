#!/usr/bin/env node
const fsp = require('fs').promises;
const fs = require('fs');
const glob = require("glob");
const {program} = require('commander')

program
  .option('-f, --file <filename>', 'output file name', 'sdocs')  
  .option('-ni, --no-index', 'do not output an index', false)
program.parse(process.argv)

const filepath = `${program.file}.md`

const options = {
  ignore: '**/node_modules/**'
}

const files = glob.sync("**/**.+(js|jsx|ts|tsx)", options)

const readFile = file => {
  return new Promise((resolve) => {
    fs.readFile(file, {encoding: 'utf-8'}, function (err, data) {
      if (err) throw err;
      
      const start = data.indexOf('/*sdoc')
      if (start > -1 && start < 10 ) {
        const ends = data.indexOf('*/')
        resolve({filename: file, data: data.slice(start + 7, ends).trim()})
      } else {
        resolve('')
      }     
    });
  })
}

const readFiles = async () => {
  return Promise.all(files.map(item => readFile(item)))
}

const filterFiles = async () => {
  const read = await readFiles()
  const filtered = read.filter(el => el !== '')
  return filtered
}

const formatText = (text, mode) => {
  switch (mode) {
    case 'index':
      return `[${text.filename}](#${text.filename.replace(/\/|\./g,'')})`
    case 'description':
      return `#### ${text.filename}\n  ${text.data}`
  }
}

const parseDescription = async () => {
  const filtered = await filterFiles()
  const textToWrite = filtered.map(el => formatText(el, 'description'))
  return textToWrite.join('\n')
}

const parseIndex = async () => {
  const filtered = await filterFiles()
  const textToWrite = filtered.map(el => formatText(el, 'index'))
  return textToWrite.join('\n') + '\n'
}


(async () => {
  if (program.index){
  await fsp.writeFile(filepath, await parseIndex(), 'utf8')
  await fsp.appendFile(filepath, await parseDescription(), 'utf8')
  } else {
    await fsp.writeFile(filepath, await parseDescription(), 'utf8')
  }
})();