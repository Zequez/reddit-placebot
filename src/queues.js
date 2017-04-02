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
    let nextIn = getNext(usersNames)
    console.log(`${accounts.length}/${bundle} accounts until update`)
    setTimeout(() => watch(usersNames, bundle, cb), nextIn * 1000 + 1000)
  }
}

function getAvailableAccounts (usersNames) {
  let accounts = []
  usersNames.forEach((user) => {
    if (!queues[user]) schedule(user)
    if (queues[user] < new Date().valueOf()) {
      accounts.push(user)
    }
  })
  return accounts
}

function getNext (usersNames) {
  let timeNow = new Date().valueOf()
  let nextOne = Infinity
  let countdowns = []
  usersNames.forEach((user) => {
    let secs = (queues[user] - timeNow) / 1000
    if (secs < nextOne && secs > 0) {
      nextOne = Math.round(secs)
    }
    countdowns.push(`${user} ${secs}s`)
  })

  let date = new Date(timeNow + nextOne * 1000)

  console.log(countdowns.join('; '))
  console.log(`Next account in ${nextOne} seconds, at ${date.getHours()}:${date.getMinutes()}`)

  return nextOne
}

module.exports = {
  watch: watch,
  schedule: schedule,
  isScheduled: (user) => !!queues[user]
}
