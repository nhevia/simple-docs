const commander = require('commander');

class Command {
  constructor() {
    const command = new commander.Command();
    command
      .option('-f, --file <filename>', 'output file name', 'sdocs')
      .option('-ni, --no-index', 'do not output an index', false)
          

    this.command = command;
  }

  parse = (args) => {
    this.command.parse(args)
  }
}

module.exports = {
    Command
}