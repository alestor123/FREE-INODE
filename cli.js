#!/usr/bin/env node

const freeInode = require('./App')
const chalk = require('chalk')
const { sync } = require('rimraf')
const prompt = require('prompt-sync')()
const { textSync } = require('figlet')
const Prompt = require('prompt-checkbox')

try {
  let libinode = 0
  const data = freeInode('./')
  const threshold = process.argv[2] || 1
  console.log(textSync('FREE-INODE'))
  new Prompt({
    type: 'checkbox',
    message: 'Which all directory you want to delete?',
    choices: data.map(adrs => adrs.path + ' inode : ' + (adrs.inumber <= threshold ? chalk.greenBright.bold(adrs.inumber) : chalk.redBright.bold(adrs.inumber)))
  }).ask(answers => {
    if (!yesNo(prompt(chalk.greenBright.bold('Are you sure (Y/n):')))) {
      console.log(chalk.redBright.bold('Aborted !!'))
      process.exit(0)
    }
    answers.map(spl => data.find(nam => nam.path === spl.split(' inode : ')[0])).forEach(obj => {
      libinode += obj.inumber
      sync(obj.path)
    })
    console.log(chalk.greenBright.bold('Liberated Inodes :' + libinode))
  })
} catch (e) {
  console.log(chalk.redBright.bold('Oops : ' + e.message))
}
function yesNo (res) {
  return res.replace(' ', '').charAt(0).toLocaleLowerCase() === 'y'
}
