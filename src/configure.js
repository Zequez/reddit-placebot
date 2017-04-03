const config = require('../config')
const users = require('../users')

let argv = require('minimist')(process.argv.slice(2));

if (argv.remote) config.useRemoteTarget = true
if (argv.target) {
  if (config.useRemoteTarget) config.REMOTE_TARGET_URL = argv.target
  else config.LOCAL_TARGET_FILE = __dirname + '/../' + argv.target
}
if (argv.startX != null) config.targetStartX = +argv.startX
if (argv.startY != null) config.targetStartY = +argv.startY

require('colors')
console.info('###############################################'.cyan)
console.info('######### CONFIGURATION (change on config.json)'.cyan)
if (config.useRemoteTarget) {
  console.info(`  Using Remote Target: `.cyan, config.REMOTE_TARGET_URL)
} else {
  console.info(`  Using Local Target: `.cyan, config.LOCAL_TARGET_FILE)
}
console.info(`  Accounts: `.cyan, Object.keys(users).join(', '))
console.info(`  Bundle Accounts: `.cyan, config.bundleAccounts)
console.info(`  Target Start Position: `.cyan, `X: ${config.targetStartX}  Y: ${config.targetStartY}`)
console.info(`  Target Draw Mode:`.cyan, config.drawMode)

if (config.useExistingBoardCache) console.log('  Testing flag: useExistingBoardCache'.yellow)
if (config.mockPainting) console.log('  Testing flag: mockPainting'.yellow)

console.info('###############################################'.cyan)
console.info('###############################################'.cyan)
console.info(' ')
console.info(' ')
