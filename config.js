module.exports = {
  BOARD_URL: 'https://www.reddit.com/api/place/board-bitmap',
  BOARD_FILE: __dirname + '/tmp/board.bmp',
  BOARD_H: 1000,
  BOARD_W: 1000,

  REMOTE_TARGET_URL: 'https://raw.githubusercontent.com/Zequez/placebot-argentina-target/master/official_target.bmp',
  REMOTE_TARGET_FILE: __dirname + '/tmp/target.bmp',

  LOCAL_TARGET_FILE: __dirname + '/images/target.png',

  DRAW_URL: 'https://www.reddit.com/api/place/draw.json',

  // Use the REMOTE_TARGET_URL file as target, otherwise it's gonna just
  // try to read from target.bmp
  autoupdateRemoteTarget: true,

  // Wait until these amount of accounts are available
  // and paint pixels at the same time
  bundleAccounts: 4,


  // Testing configuration things

  // This is used for testing
  useExistingBoardCache: false,

  // Do not send the painting to the server so you don't waste your pixels
  // while testing something else
  mockPainting: false
}
