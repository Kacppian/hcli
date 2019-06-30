import { Command, flags } from '@oclif/command';
import Hackernews from './Hackernews';
import Renderer from './Renderer';
import Article from './Reader';
import { cli } from 'cli-ux';
import * as inquirer from 'inquirer';
const readline = require('readline');

const stdin: any = process.stdin;
readline.emitKeypressEvents(stdin);
stdin.setRawMode(true);


interface Choice {
  name: string,
  value: string
}

class Hcli extends Command {
  static description = 'Loads hackernews articles to read in the terminal'

  static flags = {
    help: flags.help({ char: 'h' })
  }

  async run() {

    const hn = new Hackernews();
    const stories = await hn.getStories();

    const choices = <Choice[]>stories.map(s => {
      return { name: s.title, value: s.url };
    });

    let currentIndex = 0;
    let pageSize = 20;
    let start = 0;
    let end = start + pageSize;

    const renderer = new Renderer();
    renderer.render(choices, currentIndex);

    stdin.resume();


    stdin.on('keypress', (str: any, key: any) => {

      stdin.pause();

      if (['up', 'down'].includes(key.name)) {

        currentIndex = key.name === 'up' ? currentIndex - 1: currentIndex + 1;
        renderer.render(choices, currentIndex);
      }
      else if(key.name === 'return') {

          const choice = choices[currentIndex];
          console.log(`Loading the article - ${choice.name}`);
          const a = new Article(choice.value);
          a.getContent().then(r => {
            console.log(r);
          });
      }
      else {
        process.exit(1);
      }

      stdin.resume();

    });

  }
}

export = Hcli
