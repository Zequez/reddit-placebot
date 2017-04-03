const fs = require('fs')
const axios = require('axios')
const Jimp = require('jimp')

const config = require('../config')
const colors = require('./colors')

function load () {
  if (config.useExistingBoardCache) {
    return loadFromFile(config.BOARD_FILE)
  } else {
    return loadFromUrl(config.BOARD_URL, config.BOARD_FILE)
  }
}

function loadFromUrl (url, file) {
  return axios.get(url, {
    responseType: 'arraybuffer'
  }).then(function (response) {
    return saveAsBmp(response.data, file)
  })
}

function loadFromFile (file) {
  return Promise.resolve(fs.readFileSync(file))
}

function loadFromRawFile (sourceFile, targetFile) {
  let boardBuffer = fs.readFileSync(sourceFile)
  return saveAsBmp(boardBuffer, targetFile)
}

function saveAsBmp (buffer, targetFile) {
  let img = new Jimp(1000, 1000)

  let pixels = []

  let i = 4
  for (let y = 0; y < 1000; ++y) {
    for (let x = 0; x < 500; ++x) {
      let datum = buffer[i]

      let color1 = datum >> 4
      let color2 = datum - (color1 << 4)

      color1 = colors.byInt[color1]
      color2 = colors.byInt[color2]

      img.setPixelColor(color1, x * 2,     y)
      img.setPixelColor(color2, x * 2 + 1, y)

      ++i
    }
  }

  return new Promise((resolve) => {
    img.write(targetFile, function () {
      resolve(fs.readFileSync(targetFile))
    })
  })
}

module.exports = {
  load: load,
  loadFromRawFile: loadFromRawFile,
  loadFromUrl: loadFromUrl,
  saveAsBmp: saveAsBmp
}
