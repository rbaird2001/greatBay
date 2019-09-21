const select = require("inquirer");

(async () => {
    let answer;

    answer = await select.prompt([
        {
            message: 'Select a package manager',
            name: "TestEntry",
            type: "rawlist",
            choices: [
                { name: 'npm', value: 1 },
                { name: 'yarn', value: 2 },
                { name: 'jspm', value: -1, disabled: true }
            ]
        },
        {
            message:"Which is the best dog name",
            name: "dogName",
            type:"rawlist",
            choices:[
                {name: 'rex',value:'rex'},
                {name:'fido',value:"fido"},
                {name:"fluffy",value:"fluffy"}
            ]
        },
        {message: 'Select your favorite letter',
        name: "favLetter",
        type: "list",
        choices: [
          { value: 'A' },
          { value: 'B' },
          { value: 'C' },
          { value: 'D' },
          { value: 'E' },
          { value: 'F' },
          { value: 'G' },
          { value: 'H' },
          { value: 'I' },
          { value: 'J' },
          { value: 'K' },
          { value: 'L' },
          { value: 'M' },
          { value: 'N' },
          { value: 'O' },
          { value: 'P' },
          { value: 'Q' },
          { value: 'R' },
          { value: 'S' },
          { value: 'T' },
          { value: 'U' },
          { value: 'V' },
          { value: 'W' },
          { value: 'X' },
          { value: 'Y' },
          { value: 'Z' }
        ]
      }
    ]);
      console.log('Answer:', answer);
})();