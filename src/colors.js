const Jimp = require('jimp')

const colors = [
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

module.exports = {
  byHex: colors,
  byInt: colors.map((c) => Jimp.rgbaToInt(c[0], c[1], c[2], 255)),
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
