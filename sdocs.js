#!/usr/bin/env node
const fsp = require('fs').promises;
const fs = require('fs');
const glob = require("glob");
const {program} = require('commander')

program.option('-f, --file <filename>', 'output file name', 'sdocs')  
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

const parseData = async () => {
  const read = await readFiles()
  const filtered = read.filter(el => el !== '')
  const textToWrite = filtered.map(el => `>${el.filename}\n\n  ${el.data}`)
  return textToWrite.join('\n')
}


(async () => {
  await fsp.writeFile(filepath, await parseData(), 'utf8');
})();