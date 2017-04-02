const fs = require('fs')

const FILE = __dirname + '/../tmp/cookies.json'
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '{}')

const cookies = require(FILE)

function save () {
  fs.writeFileSync(FILE, JSON.stringify(cookies, null, '\t'))
}

module.exports = {
  get: (user) => {
    return cookies[user]
  },
  set: (user, cookie, modhash) => {
    cookies[user] = cookies[user] || {}
    cookies[user].cookie = cookie
    cookies[user].modhash = modhash
    save()
  },
  del: (user) => {
    delete cookies[user]
    save()
  }
}
