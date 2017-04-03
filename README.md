# Reddit Placebot

> Anything that can be automated should be automated

This is a bot I made for the Reddit [/r/place](https://www.reddit.com/r/place/) event of 2017 April Fools Day. I just wanted to make a simple quick script because I expected it to last until April 2nd. It seems the Placebot will be useful for a little more time.

Originally made this bot to protect our national flag on [/r/argentina](https://www.reddit.com/r/argentina/). But you can use it
for your artwork or evil deeds, with your own account, your other 4 throwaways, or
the 1000 accounts dump you found on Pastebin. The Placebot is impartial and doesn't discriminate.

![Some artwork  from our sub](https://raw.githubusercontent.com/Zequez/reddit-placebot/master/images/preview.png)

## Non-tech install

These are the step-by step instructions for non-tech people:

- Go to [nodejs.org](https://nodejs.org/) and download and install the latest version
- On this page, click the green *Clone or download* button and then on *Download ZIP*
- Uncompress the downloaded zip file
- Go to the uncompressed folder
- Rename the *users.example.json* to *users.json* and open it up to put your Reddit user names and passwords in the same format the examples (and erase the examples)
- Run one time: *install.bat* (Windows) or *install.sh* (Linux or Mac) and wait until it finishes
- Run every time you want to use it: *start.bat* (Windows) or *start.sh* (Linux or Mac)
- Configure stuff if you need to on *config.json*, or open the start scripts and add command line arguments there

Para la imagen oficial de Argentina usen *start_argentina.bat* o *start_argentina.sh*

## Installation

You need to have [NodeJS installed](https://nodejs.org)

```
git clone https://github.com/zequez/reddit-placebot
cd reddit-placebot
npm install
```

### Users

Change `users.example.json` to `users.json` and add your username and password
of your account and all your throwaways.

## Usage

Any command line options will override the options on `config.json`:

```
  npm run start
  npm run start --remote --target <REMOTE_TARGET_URL>
  npm run start --target <LOCAL_TARGET_FILE>
  npm run start --target <LOCAL_TARGET_FILE> --startX <targetStartX> --startY <targetStartY>
```

### Target Oficial Argentino

Este comando es nosotros _boludo_:

`npm run start --argentinaTarget`

This uses the file at: https://raw.githubusercontent.com/Zequez/placebot-argentina-target/master/official_target.png

## Configuration

### The Target Image File

It can be a PNG, JPG or BMP file of any size or compression.

To change the position of the board you want to paint the target in:

- `targetStartX: 0-999`
- `targetStartY: 0-999`

Transparent pixels are just transparent pixels in PNG, or #ff00ff (for legacy reasons)
and will be ignored by the bot.

#### Colors

You can use any colors and will try to find the closest match. The available
board colors are visible in the file /src/colors.js. But it's better if you use
and eyedropper tool from a board image.

### Target Location

The bot downloads the board each time it's time to draw, so it only changes
the necessary pixels that don't match the target.

#### Remote (for multiple people)

You can configure the target to be downloaded from a remote URL:

- `useRemoteTarget: true`
- `REMOTE_TARGET_URL: "http://example.com/remote_target.png"`

The image will be downloaded before painting and saved to `images/remote_target`.

#### Local (just for your own bots)

*images/target.png*

- `useRemoteTarget: false`
- `LOCAL_TARGET_FILE: __dirname + '/images/target.png'`

### Bundle up changes

If you want to wait until multiple users are available to paint and do the
changes all at the same time, change the config:

- `bundleAccounts: <Number 1-Infinity> (default = 8)`

### Drawing Mode

- `drawMode: <mode> (default = 'RANDOM')`
  - `'LEFTTOP'`: Will draw from left to right and top to bottom
  - `'RANDOM'`: Will draw at random points

## Testing

LOL

My initial intention was to make a simple script, didn't expect it to last, so
testing manually was feasible. Now I should be writing tests, because it's getting
tedious, but I don't know how long will /r/place last for.

## Other Projects

Thanks to [trosh/rplace](https://github.com/trosh/rplace) to figure out how to actually read the bitmap from the server. I just ported that to Node.

Thanks [oliver-moran/jimp](https://github.com/oliver-moran/jimp) for a Node image processing library
without any kind of binary dependencies.

Thanks [dtao/nearest-color](https://github.com/dtao/nearest-color) for the nearest
color matching.

## License

The Reddit Placebot is released under the [MIT License](http://www.opensource.org/licenses/MIT).
