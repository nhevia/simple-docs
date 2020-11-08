const command = require('../src/command/command');
// const { Command } = require('commander');

describe("Command", () => {

  describe("parse", () => {

    test("parses valid arguments without options", () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      command.parse(['nodepath', 'filepath']);
      
      expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
    })

    test("exits with error on non existent option", () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
      
      command.parse([
              'nodepath',
              'filepath',
              '-b'
          ]
      );

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith("error: unknown option '-b'");
      expect(processExitSpy).toHaveBeenCalledTimes(1);
      expect(processExitSpy).toHaveBeenCalledWith(1);
    })

    test("exits with error on existent option but no argument", () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
      
      command.parse([
              'nodepath',
              'filepath',
              '-f'
          ]
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith("error: option '-f, --file <filename>' argument missing");
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(processExitSpy).toHaveBeenCalledTimes(1);
      expect(processExitSpy).toHaveBeenCalledWith(1);
    })

    // TODO: somehow does not get called, not even working spawning a new local instance
    // test("no error on existent option and valid argument", () => {
    //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    //   const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

    //   const program = new Command();
    //   program
    //     .option('-f, --file <filename>', 'output file name', 'sdocs')  
    //     .option('-ni, --no-index', 'do not output an index', false)

    //   program.parse([
    //     'nodepath',
    //     'filepath',
    //     '-f',
    //     'component-documentation'
    //     ]
    //   );

    //   expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
    //   expect(processExitSpy).toHaveBeenCalledTimes(1);
    //   expect(processExitSpy).toHaveBeenCalledWith(1);
    // })
    
  })

  afterEach(() => {
    jest.clearAllMocks();
  });
})
