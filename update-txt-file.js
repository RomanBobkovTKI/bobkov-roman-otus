#!/usr/bin/env node

const commander = require('commander');
require('dotenv').config()
const program = new commander.Command();
const fs = require('fs')

program
  .name('update-txt-file')
  .description('Update txt file')
  .option('-f, --file <path>', 'Specify file path')
  .option('-c, --content <text>', 'Specify new file content')
  .action(() => {
    if (process.env.IS_AUTH==='true') {
      const newContent = program._optionValues.content
      const filePath = program._optionValues.file
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      fs.writeFileSync(filePath, `${fileContent} ${newContent}`);
      console.log('Update.')
    } else {
      console.log('You are already logged in')
    }
  })

program.parse(process.argv)

