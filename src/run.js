global.Promise = require('bluebird')
const fs = require('fs')
const qs = require('querystring')
const axios = require('axios')

const TMPDIR = __dirname + '/../tmp'
if (!fs.existsSync(TMPDIR)) fs.mkdirSync(TMPDIR)

const config = require('../config')

if (!fs.existsSync(__dirname + '/../users.json')) throw 'You must have a users.json file'
const users = require('../users')

const boardDownloader = require('./board_downloader')
const targetDownloader = require('./target_downloader')
const boardDiffer = require('./board_differ')
const authentication = require('./authentication')
const queues = require('./queues')
const cookies = require('./cookies')

require('./configure')



startQueue()

function startQueue () {
  for (let user in users) { if (!queues.isScheduled(user)) queues.schedule(user) }
  let bundleAccountsNumber = Math.min(Object.keys(users).length, config.bundleAccounts)
  queues.watch(Object.keys(users), bundleAccountsNumber, (availableUsers) => {
    return usersRun(availableUsers)
  })
}

function usersRun (availableUsers) {
  console.log('Running users ', availableUsers.join(', '))

  return authentication.ensureAuth(availableUsers).then(() => {
    return Promise.all([
      boardDownloader.load(),
      targetDownloader.load()
    ]).then((buffers) => {
      return boardDiffer(buffers[0], buffers[1]).then((actions) => {
        let promises = []
        availableUsers.forEach((user) => {
          let action = actions.shift()
          if (action) {
            promises.push(userPaint(user, action))
          } else {
            console.log('Nothing to do')
            queues.schedule(user, 10)
          }
        })
        return Promise.all(promises)
      })

    })
  })
}

function userPaint (user, action) {
  let cookie = cookies.get(user)

  console.log('Painting ', action)

  let request = {
    method: 'POST',
    url: config.DRAW_URL,
    data: qs.stringify({
      x: action.x,
      y: action.y,
      color: action.color
    }),
    headers: {
      cookie: cookie.cookie,
      'x-modhash': cookie.modhash,
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  if (config.mockPainting) {
    console.log('Mock painting!')
    queues.schedule(user, 5)
    return Promise.resolve()
  }

  return axios(request).then((response) => {
    queues.schedule(user, response.data.wait_seconds)
  }).catch((error) => {
    let seconds = error.response.data.wait_seconds

    if (seconds) {
      console.log('Could not paint, user available in ', seconds, ' seconds')
      queues.schedule(user, seconds)
    } else {
      console.log('Could not paint, some unknown error, forcing re-authentication, remember that new accounts cannot participate on /r/place and will be rejected by the server')
      cookies.del(user)
    }
  })
}
