'use strict'
const { readdirSync, statSync } = require('fs')
const { join, resolve } = require('path')
let files = ['./']
let run = false
const isValid = pth => !(/^([a-zA-Z]:)?(\\{2}|\/)?([a-zA-Z0-9\\s_@-^!#$%&+={}\]]+(\\{2}|\/)?)+(\.xml+)?$/.test(pth))

module.exports = path => {
  if (!(path && typeof path === 'string' && isValid(path))) throw new Error('Please enter a vaild path')
  const dirs = readdirSync(path, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
  return dirs.map(name => {
    const pth = join(path, name)
    return { name, inumber: inum(pth), path: resolve(pth) }
  })
}
function inum (path) {
  files = run ? ['./'] : files
  run = true
  return getAllContent(path).length
}
function getAllContent (dir) {
  readdirSync(dir).forEach(file => {
    const inn = join(dir, file)
    if (statSync(inn).isDirectory()) {
      files.push(inn)
      return getAllContent(inn)
    } else return files.push(inn)
  })
  return files
}
