const {program} = require('commander')

program.option('--init')//.option('-s,--separator <char>')

program.parse()

// const options = program.opts()
// const limit = options.first ? 1 : undefined
// console.log(program.args[0].split(options.separator, limit))
console.log('hello world')
