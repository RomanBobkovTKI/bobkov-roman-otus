#!/usr/bin/env node

const commander = require('commander')

const program = new commander.Command();

program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name()
});

program.command('auth [user, password]', 'Login in app')
program.command('create-txt-file [text]', 'Create txt file')
program.command('read-txt-file [path]', 'Read txt file')
program.command('update-txt-file [path, text]', 'Update txt file')
program.command('delete-txt-file [path]', 'Delete txt file')

program.parse();