module.exports = {
  BOARD_FILE: 'board.bmp',
  TARGET_FILE: 'target.bmp',

  BOARD_URL: 'https://www.reddit.com/api/place/board-bitmap',
  DRAW_URL: 'https://www.reddit.com/api/place/draw.json',

  REMOTE_TARGET_URL: 'https://raw.githubusercontent.com/Tackyou/placebot-germany-target/master/target.bmp',

  BOARD_H: 1000,
  BOARD_W: 1000,

  // Use the REMOTE_TARGET_URL file as target, otherwise it's gonna just
  // try to read from target.bmp
  autoupdateRemoteTarget: true,

  // Wait until these amount of accounts are available
  // and paint pixels at the same time
  bundleAccounts: 1
}
