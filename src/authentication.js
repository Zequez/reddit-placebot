const qs = require('qs')
const axios = require('axios')
const cookies = require('./cookies')
const users = require('../users')

function auth (user) {
  let passwd = users[user]

  console.log('Getting modhash and cookies for ', user)

  return axios.post('https://www.reddit.com/api/login/' + user, qs.stringify({
    op: 'login',
    user: user,
    passwd: passwd,
    api_type: 'json'
  }))
  .then((response) => {
    if (response.data.json.data) {
      let modhash = response.data.json.data.modhash
      let cookie = response.headers['set-cookie'].map((c) => c.split(';')[0]).join('; ')
      cookies.set(user, cookie, modhash)
    } else {
      console.log(response.data.json)
    }
  })
}

function ensureAuth (usersNames = Object.keys(users)) {
  let promises = []
  usersNames.forEach((user) => {
    if (!cookies.get(user)) {
      promises.push(auth(user))
    }
  })
  return Promise.all(promises)
}

module.exports = {
  auth: auth,
  ensureAuth: ensureAuth,
  isAuth: (user) => !!cookies.get(user),
  cookie: (user) => cookies.get(user) && cookies.get(user).cookie,
  modhash: (user) => cookies.get(user) && cookies.get(user).modhash,
  invalidate: (user) => cookies.del(user)
}
