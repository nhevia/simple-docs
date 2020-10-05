const {program} = require('commander')

// available parameters to pass to sdoc
program
  .option('-f, --file <filename>', 'output file name', 'sdocs')  
  .option('-ni, --no-index', 'do not output an index', false)
program.parse(process.argv)

module.exports = program