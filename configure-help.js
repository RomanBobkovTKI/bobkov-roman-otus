#!/usr/bin/env node

const commander = require('commander')

const program = new commander.Command();

program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name()
});

//Опсание команд
program.command('auth [user, password]', 'Login in app')
/* program
  .option('test') */

program.parse();