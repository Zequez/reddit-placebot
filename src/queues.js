const fs = require('fs')

const FILE = __dirname + '/../tmp/queues.json'
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '{}')

const queues = require(FILE)

function save () {
  fs.writeFileSync(FILE, JSON.stringify(queues, null, '\t'))
}

function schedule (user, seconds = -1) {
  queues[user] = new Date().valueOf() + seconds * 1000
  save()
}

function watch (usersNames, bundle, cb) {
  let accounts = getAvailableAccounts(usersNames)
  if (accounts.length >= bundle) {
    cb(accounts.slice(0, bundle)).then(() => {
      watch(usersNames, bundle, cb)
    })
  } else {
    let nextOneIn = printCountdowns(usersNames)
    console.log(`${accounts.length}/${bundle} accounts until update`)
    console.log(`Next account in ${nextOneIn} seconds`)
    setTimeout(() => watch(usersNames, bundle, cb),
      Math.min(10, nextOneIn) * 1000 + 1000)
  }
}

function getAvailableAccounts (usersNames) {
  let accounts = []
  usersNames.forEach((user) => {
    if (queues[user] && queues[user] < new Date().valueOf()) {
      accounts.push(user)
    }
  })
  return accounts
}

function printCountdowns (usersNames) {
  let countdowns = []
  let timeNow = new Date().valueOf()
  let nextOne = Infinity
  usersNames.forEach((user) => {
    if (queues[user]) {
      let secs = (queues[user] - timeNow) / 1000
      if (secs < nextOne && secs > 0) {
        nextOne = secs
      }
      countdowns.push(`${user} ${Math.round(secs)}s`)
    }
  })
  console.log(countdowns.join('; '))
  return nextOne
}

module.exports = {
  watch: watch,
  schedule: schedule,
  isScheduled: (user) => !!queues[user]
}
