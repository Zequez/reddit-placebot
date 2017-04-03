module.exports = {
  BOARD_URL: 'https://www.reddit.com/api/place/board-bitmap',
  BOARD_FILE: __dirname + '/tmp/board.bmp',
  
  REMOTE_TARGET_URL: 'https://raw.githubusercontent.com/Zequez/placebot-argentina-target/master/official_target.png',
  REMOTE_TARGET_FILE: __dirname + '/tmp/remote_target',

  LOCAL_TARGET_FILE: __dirname + '/images/target.png',

  DRAW_URL: 'https://www.reddit.com/api/place/draw.json',

  // Use the REMOTE_TARGET_URL file as target, otherwise it's gonna just
  // try to read from target.bmp
  useRemoteTarget: false,

  // Wait until these amount of accounts are available
  // and paint pixels at the same time
  bundleAccounts: 8,

  // The PLACEBOT mark in the world <3
  targetStartX: 929,
  targetStartY: 991,


  // Testing configuration things

  // This is used for testing
  useExistingBoardCache: false,

  // Do not send the painting to the server so you don't waste your pixels
  // while testing something else
  mockPainting: false
}
