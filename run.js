// https://www.ivankuznetsov.com/2010/02/no-space-left-on-device-running-out-of-inodes.html
const freeInode = require('./App')
// console.log(freeInode('ewd'))
console.log(freeInode('./'))
