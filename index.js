#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .description('My CLI application')
  .option('-f, --file <filename>', 'Specify a file name')
  .option('-t, --text <string>', 'Text for file')
  .option('-c, --content <text>', 'Specify new file content')
  .command('start', 'Start the application')
  .command('create-txt-file', 'Create txt file')
  .command('delete-txt-file', 'Delete txt file')
  .command('read-txt-file', 'Read txt file')
  .command('update-txt-file', 'Update txt file')
  .command('auth', 'Auth in the system')

program.parse();

exports = module.exports = new Command();
exports.program = exports;