#!/usr/bin/env node

const commander = require('commander');
require('dotenv').config()
const program = new commander.Command();
const fs = require('fs')

program
  .name('create-txt-file')
  .description('Create txt file')
  .option('-t, --text <string>', 'Write text', 'Some text')
  .action(() => {
    if (process.env.IS_AUTH==='true') {
      const resolutionType = program._optionValues.text
      
      fs.writeFile('resolution.txt', resolutionType, (err) => {
        if (err) throw err;
        console.log('Resolution saved!');
      });
    } else {
      console.log('You are already logged in')
    }
  })

program.parse(process.argv)

