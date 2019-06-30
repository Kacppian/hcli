const chalk = require('chalk');

interface Choice {
  name: string,
  value: string
}

class Renderer {
    stdout: any;
    pageSize: number;
    start: number;
    end: number;

   constructor() {
       this.stdout = process.stdout;
       this.pageSize = 20;
       this.start = 0;
       this.end = this.start + this.pageSize;
   }

   clear() {}

   render(values: Choice[], highlightIndex: number = 0): void {
       console.clear();
       console.log("H-CLI");
       console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
       console.log("Use up and down arrow keys to navigate the list. ");
       console.log("Hit enter/return to read the story");
       console.log();

       if(highlightIndex >= this.end) {
           this.start = this.end;
           this.end += this.pageSize;
       }

       const limitedValues = values.slice(0, this.end);

       limitedValues.map((choice, index) => {
           let choiceName = choice.name;

           if(index === highlightIndex) {
               choiceName = chalk.green.bold(`${choiceName}`);
           }

           this.stdout.write(`${index+1}. ${choiceName}`);
           this.stdout.write("\n");
       });
       this.stdout.write("\n");
   }

}

export default Renderer;
