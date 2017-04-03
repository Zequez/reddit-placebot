const expect = require('chai').expect
const Jimp = require('jimp')
const config = require('../config')
const colors = require('../src/colors')

describe('Array', () => {
  describe('#toCode', () => {
    it('should return the correct color code number', (done) => {
      Jimp.read(__dirname + '/fixtures/colors.png', (err, image) => {
        if (err) throw err
        let getName = (x, y) => {
          let pixelColor = image.getPixelColor(x, y)
          let colorCode = colors.byInt.indexOf(pixelColor)
          expect(colorCode).to.not.equal(-1)
          return colors.byName[colorCode]
        }

        expect(getName(0, 0)).to.equal('white')
        expect(getName(1, 0)).to.equal('lightgray')
        expect(getName(2, 0)).to.equal('darkgray')
        expect(getName(3, 0)).to.equal('black')
        expect(getName(0, 1)).to.equal('lightpink')
        expect(getName(1, 1)).to.equal('red')
        expect(getName(2, 1)).to.equal('orange')
        expect(getName(3, 1)).to.equal('brown')
        expect(getName(0, 2)).to.equal('yellow')
        expect(getName(1, 2)).to.equal('lightgreen')
        expect(getName(2, 2)).to.equal('green')
        expect(getName(3, 2)).to.equal('cyan')
        expect(getName(0, 3)).to.equal('grayblue')
        expect(getName(1, 3)).to.equal('blue')
        expect(getName(2, 3)).to.equal('pink')
        expect(getName(3, 3)).to.equal('purple')
        done()
      })
    });
  })

  describe('#closest', () => {
    it('should return the closest colors possible', (done) => {
      Jimp.read(__dirname + '/fixtures/closeish-colors.png', (err, image) => {
        if (err) throw err
        let getName = (x, y) => {
          let pixelColor = image.getPixelColor(x, y)
          expect(colors.byInt.indexOf(pixelColor)).to.equal(-1)
          let closest = colors.closest(pixelColor)
          return colors.byName[colors.byInt.indexOf(closest)]
        }

        expect(getName(0, 0)).to.equal('white')
        expect(getName(1, 0)).to.equal('lightgray')
        expect(getName(2, 0)).to.equal('darkgray')
        expect(getName(3, 0)).to.equal('black')
        expect(getName(0, 1)).to.equal('lightpink')
        expect(getName(1, 1)).to.equal('red')
        expect(getName(2, 1)).to.equal('orange')
        expect(getName(3, 1)).to.equal('brown')
        expect(getName(0, 2)).to.equal('yellow')
        expect(getName(1, 2)).to.equal('lightgreen')
        expect(getName(2, 2)).to.equal('green')
        expect(getName(3, 2)).to.equal('cyan')
        expect(getName(0, 3)).to.equal('grayblue')
        expect(getName(1, 3)).to.equal('blue')
        expect(getName(2, 3)).to.equal('pink')
        expect(getName(3, 3)).to.equal('purple')
        done()
      })
    })
  })
})

describe('#isTransparent', () => {
  it('should consider transparent as transparent', () => {
    expect(colors.isTransparent(0xFAFAFA00)).to.equal(true)
  })

  it('should consider #FF00FF as transparent', () => {
    expect(colors.isTransparent(0xFF00FFFF)).to.equal(true)
  })

  it('should not consider white as transparent', () => {
    expect(colors.isTransparent(0xFFFFFFFF)).to.equal(false)
  })
})
