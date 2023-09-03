#!/usr/bin/env node

const commander = require('commander')
const prompt = require('prompt-sync')();

const program = new commander.Command();

program
  .name('auth')
  .description('auth')
  .action((user, password) => {

    user = prompt('login:');
    password = prompt.hide('password:');
    

  });

program.parse();
