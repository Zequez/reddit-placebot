const Jimp = require('jimp')

let TRANSPARENT = 0xff00ffff

const COLORS = [
  [255, 255, 255],
  [228, 228, 228],
  [136, 136, 136],
  [34, 34, 34],
  [255, 167, 209],
  [229, 0, 0],
  [229, 149, 0],
  [160, 106, 66],
  [229, 217, 0],
  [148, 224, 68],
  [2, 190, 1],
  [0, 211, 221],
  [0, 131, 199],
  [0, 0, 234],
  [207, 110, 228],
  [130, 0, 128]
]

const NAMES = [
  'white',
  'lightgray',
  'darkgray',
  'black',
  'lightpink',
  'red',
  'orange',
  'brown',
  'yellow',
  'lightgreen',
  'green',
  'cyan',
  'grayblue',
  'blue',
  'pink',
  'purple'
]

const byInt = COLORS.map((c) => Jimp.rgbaToInt(c[0], c[1], c[2], 255))
const byRgb = COLORS.map((c) => ({r: c[0], g: c[1], b: c[2]}))
const byHex = byInt.map((c) => {
  let str = c.toString(16)
  let pad = '#00000000'
  str = pad.substring(0, pad.length - str.length) + str
  return str.slice(0, 7)
})

const nearestColor = (function () {
  let named = {}
  COLORS.forEach((c, i) => named[NAMES[i]] = byHex[i])
  return require('nearest-color').from(named)
})()

function closest (colorInt) {
  let color = Jimp.intToRGBA(colorInt)
  let nearest = nearestColor(color)
  c = byInt[byHex.indexOf(nearest.value)]
  if (c === -1) throw `This should not happen`
  return c
}

function isTransparent (colorInt) {
  let color = Jimp.intToRGBA(colorInt)
  return color.a < 128 || colorInt === TRANSPARENT
}

function toCode (color) {
  return byInt.indexOf(color)
}

module.exports = {
  toCode: toCode,
  closest: closest,
  isTransparent: isTransparent,
  byHex: byHex,
  byInt: byInt,
  byRgb: byInt,
  byName: [
    'white',
    'lightgray',
    'darkgray',
    'black',
    'lightpink',
    'red',
    'orange',
    'brown',
    'yellow',
    'lightgreen',
    'green',
    'cyan',
    'grayblue',
    'blue',
    'pink',
    'purple'
  ]
}
