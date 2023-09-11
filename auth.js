#!/usr/bin/env node

const commander = require('commander');
const prompt = require('prompt-sync')();
require('dotenv').config()
const program = new commander.Command();
const fs = require('fs')

program
  .name('auth')
  .description('auth')
  .action((login, password) => {
    
    if (process.env.IS_AUTH==='false') {
      login = prompt('login:');
      const user = findUser(login);
      if (user) {
      console.log(`Login ${user.login} already taken.`);
      } else {
      password = prompt.hide('password:');
      addUser(login, password)
      process.env.IS_AUTH==='true'
      }
    } else {
      console.log('You are already logged in')
    }
    
  });

program.parse();

export function addUser(login, password) {
  const data = fs.readFileSync('users.json', 'utf8');
  const users = JSON.parse(data);
  users.push({ login, password });
  const newData = JSON.stringify(users);
  fs.writeFileSync('users.json', newData);
}

export function findUser(login) {
  const data = fs.readFileSync('users.json', 'utf8');
  const users = JSON.parse(data);
  const foundUser = users.find(user => user.login === login);
  return foundUser || null;
}