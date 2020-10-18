const {Command} = require ('../command/command')

describe("Command", () => {

  describe("parse", () => {

    test("parses valid options", () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      const command = new Command()
      command.parse(['-f', 'filename']);
      
      expect(consoleErrorSpy).toHaveBeenCalledTimes(0); 
    })

    test("exits with error on non existent option", () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
      
      const command = new Command()
      command.parse([
              'app',
              'kvp',
              '-b'
          ]
      );

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith("error: unknown option '-b'");
      expect(processExitSpy).toHaveBeenCalledTimes(1);
      expect(processExitSpy).toHaveBeenCalledWith(1);
    })

    test("exits with error on non existent option argument", () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
      
      const command = new Command()
      command.parse([
              'app',
              'kvp',
              '-f'              
          ]
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith("error: option '-f, --file <filename>' argument missing");
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(processExitSpy).toHaveBeenCalledTimes(1);
      expect(processExitSpy).toHaveBeenCalledWith(1);
    })
    
  })

  afterEach(() => {
    jest.clearAllMocks();
  });
})