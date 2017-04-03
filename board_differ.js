const bmp = require('bmp-js')
const colors = require('./colors')
const Jimp = require('jimp')

// Takes the 2 buffers and returns a valid paint to make
// the targetBuffer meet the requiremetns

let HEIGHT = 1000
let WIDTH = 1000

module.exports = function (rawBoardBuffer, rawTargetBuffer) {
  let targetBuffer = bmp.decode(rawTargetBuffer).data
  let boardBuffer = bmp.decode(rawBoardBuffer).data

  let len = targetBuffer.byteLength
  let actions = []
  for (let i = 0; i < len-4; i += 4) {
    let val = targetBuffer.readUIntBE(i, 4)
    let color = colors.byInt.indexOf(val)
    let rgb = Jimp.intToRGBA(val)

    // transparent
    if (!(rgb.r == 255 && rgb.g == 0 && rgb.b == 255)) {
      let boardVal = boardBuffer.readUIntBE(i, 4)
      if (boardVal !== val) {
        let n = (i/4)
        let x = n % 1000
        let y = Math.floor(n / 1000)

        if (color == -1) {
          console.error(`Skipping invalid color (${rgb.r}, ${rgb.g}, ${rgb.b}) at X: ${x} Y: ${y}`)
        } else {
          actions.push({ x: x, y: y, color: color })
        }
      }
    }
  }

  return actions
}
