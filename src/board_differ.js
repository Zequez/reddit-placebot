const colors = require('./colors')
const Jimp = require('jimp')

// Takes the 2 buffers and returns a list of
// valid colors changes to make

module.exports = function (rawBoardBuffer, rawTargetBuffer) {
  console.log('Finding actions')

  return new Promise((resolve) => {
    Jimp.read(rawTargetBuffer, (err, targetImg) => {
      if (err) throw err
      Jimp.read(rawBoardBuffer, (err, boardImg) => {
        if (err) throw err
        let actions = findDifference(boardImg, targetImg)
        shuffle(actions)
        resolve(actions)
      })
    })
  })
}

function findDifference (boardImg, targetImg)  {
  let actions = []
  let W = boardImg.bitmap.width
  let H = boardImg.bitmap.height
  for (let x = 0; x < W; ++x) {
    for (let y = 0; y < H; ++y) {
      let targetPx = targetImg.getPixelColor(x, y)
      if (!colors.isTransparent(targetPx)) {
        let boardPx = boardImg.getPixelColor(x, y)
        let closestPx = colors.closest(targetPx)
        if (boardPx !== closestPx) {
          let colorCode = colors.toCode(closestPx)
          actions.push({
            x: x,
            y: y,
            color: colorCode,
            name: colors.byName[colorCode]
          })
        }
      }
    }
  }
  return actions
}

// http://stackoverflow.com/a/6274381/1011428
function shuffle(a) {

  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
