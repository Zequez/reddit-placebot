// add timestamps in front of log messages
require('console-stamp')(console);

const fs = require('fs')
const qs = require('querystring')
const axios = require('axios')
const Jimp = require('jimp')

const bmp = require('bmp-js')
const colors = require('./colors')

if (!fs.existsSync('./cookies.json')) fs.writeFileSync('cookies.json', '{}')
if (!fs.existsSync('./queues.json')) fs.writeFileSync('queues.json', '{}')

const config = require('./config')

const boardDownloader = require('./board_downloader')
const targetDownloader = require('./target_downloader')
const boardDiffer = require('./board_differ')

const users = require('./users')
const cookies = require('./cookies')
const queues = require('./queues')


// boardDownloader.loadFromRawFile('_bitmap.bmp')
// boardDownloader.load()
// return

for (let user in users) { if (!queues[user]) scheduleUser(user) }

targetDownloader.load()
  .then(verifyTarget)
  .then(startQueue)

function authenticateAll () {
  for (let user in users) {
    if (!cookies[user]) {
      authenticateUser(user)
    }
  }
}

function authenticateUser (user) {
  let passwd = users[user]

  console.log('Getting modhash and cookies for ', user)

  return axios.post('https://www.reddit.com/api/login/' + user, qs.stringify({
    op: 'login',
    user: user,
    passwd: passwd,
    api_type: 'json'
  }))
  .then((response) => {
    let modhash = response.data.json.data.modhash
    let cookie = response.headers['set-cookie'].map((c) => c.split(';')[0]).join('; ')

    cookies[user] = cookies[user] || {}
    cookies[user].cookie = cookie
    cookies[user].modhash = modhash
    saveCookieJar()
  })
}

function saveCookieJar () {
  fs.writeFile('cookies.json', JSON.stringify(cookies, null, '\t'), function () {
    console.log('Cookie jar saved!')
  })
}

function userRun (user) {
  console.log('Running user ', user)

  return Promise.all([boardDownloader.load(), targetDownloader.load()])
    .then((buffers) => {
      let action = boardDiffer(buffers[0], buffers[1])
      if (action) {
        if (action.color === -1) {
          throw `Invalid color at X: ${action.x} Y: ${action.y}`
        }
        return userPaint(user, action.x, action.y, action.color)
      } else {
        console.log('Nothing to do')
        return Promise.resolve(scheduleUser(user, 30))
      }
    })
}

function userPaint (user, x, y, color) {
  if (!cookies[user]) return authenticateUser(user)

  console.log('Painting ', {x: x, y: y, color: color})

  // console.log('Mock painting!')
  // scheduleUser(user, 30)
  // return Promise.resolve()

  return axios({
    method: 'POST',
    url: config.DRAW_URL,
    data: qs.stringify({
      x: x,
      y: y,
      color: color
    }),
    headers: {
      cookie: cookies[user].cookie,
      'x-modhash': cookies[user].modhash,
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then((response) => {
    scheduleUser(user, response.data.wait_seconds)
  }).catch((error) => {
    let seconds = error.response.data.wait_seconds

    if (seconds) {
      console.log('Could not paint, user available in ', seconds, ' seconds')
      scheduleUser(user, seconds)
    } else {
      console.log('Could not paint, some unknown error, forcing re-authentication')
      delete cookies[user]
    }
  })
}

function scheduleUser (user, seconds = -1) {
  queues[user] = new Date().valueOf() + seconds * 1000
  saveQueue()
}

function saveQueue () {
  fs.writeFileSync('queues.json', JSON.stringify(queues, null, '\t'))
  console.log('Queue saved!')
}

function startQueue () {
  let nextOneIn = printCountdowns()
  authenticateAll()

  let ran = false
  for (let user in queues) {
    if (queues[user] < new Date().valueOf()) {
      ran = true
      userRun(user).then(() => {
        startQueue()
      })
      break
    }
  }

  if (!ran) {
    if (nextOneIn <= 0) nextOneIn = 0
    console.log(`Next one in ${nextOneIn} seconds`)
    setTimeout(startQueue, Math.min(30, nextOneIn) * 1000 + 1000)
  }
}

function printCountdowns () {
  let countdowns = []
  let timeNow = new Date().valueOf()
  let nextOne = Infinity
  for (let user in queues) {
    let secs = (queues[user] - timeNow) / 1000
    if (secs < nextOne) {
      nextOne = secs
    }
    countdowns.push(`${user} ${Math.round(secs)}s`)
  }
  console.log(countdowns.join('; '))
  return nextOne
}

function verifyTarget (rawBuffer) {
  let HEIGHT = 1000
  let WIDTH = 1000
  let TRANSPARENT = 0xff00ffff

  let buffer = bmp.decode(rawBuffer).data
  let len = buffer.byteLength

  for (let i = 0; i < len-4; i += 4) {
    let val = buffer.readUIntBE(i, 4)
    let color = colors.byInt.indexOf(val)
    let rgb = Jimp.intToRGBA(val)
    // transparent
    if (!(rgb.r == 255 && rgb.g == 0 && rgb.b == 255)) {
      let n = (i/4)
      let x = n % 1000
      let y = Math.floor(n / 1000)

      if (color == -1) {
        console.log(`Invalid color (${rgb.r}, ${rgb.g}, ${rgb.b}) at X: ${x} Y: ${y}`)
      }
    }
  }
}