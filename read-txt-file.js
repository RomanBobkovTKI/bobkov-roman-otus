#!/usr/bin/env node

const commander = require('commander');
require('dotenv').config()
const program = new commander.Command();
const fs = require('fs')

program
  .name('read-txt-file')
  .description('Read txt file')
  .option('-f, --file <path>', 'Read txt file')
  .action(() => {
    if (process.env.IS_AUTH==='true') {
      const filePath = program._optionValues.file
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      console.log(fileContent);
    } else {
      console.log('You are already logged in')
    }
  })

program.parse(process.argv)

