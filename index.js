#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()
const auth = require('./auth');
const update = require('./update-txt-file')
const deleteFile = require('./delete-txt-file')
const create = require('./create-txt-file')

program
  .version('1.0.0')
  .description('My CLI application')
  .option('-f, --file <filename>', 'Specify a file name')
  .command('start', 'Start the application')
  .action((cmd) => {
    if (cmd === 'auth') {
      auth(program.opts());
    } else if (cmd === 'delete') {
        deleteFile(program.opts())
    } else if (cmd === 'create') {
        create(program.opts())
    } else if (cmd === 'update') {
        update(program.opts())
    }
  })
  .parse(process.argv);

exports = module.exports = new Command();
exports.program = exports;