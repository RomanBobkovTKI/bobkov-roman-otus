#!/usr/bin/env node

const commander = require('commander');
require('dotenv').config()
const program = new commander.Command();
const fs = require('fs')

program
  .name('delete-txt-file')
  .description('Update txt file')
  .option('-f, --file <path>', 'Specify file path')
  .action(() => {
    if (process.env.IS_AUTH==='true') {
      const filePath = program._optionValues.file

      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log('File deleted!');
      });
    } else {
      console.log('You are already logged in')
    }
  })

program.parse(process.argv)

