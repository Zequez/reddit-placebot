# Reddit Place Bot

This is a bot I made for the Reddit [/r/place](https://www.reddit.com/r/place/) event of 2017 April Fools Day.

I made this bot to protect our national flag on [/r/argentina](https://www.reddit.com/r/argentina/)

![This is how it looks now, but it might change when you read it, visit the placebot-argentina-target repo to see how it actually is right now](https://raw.githubusercontent.com/Zequez/reddit-placebot/master/images/preview.png)

## Installation

You need to have [NodeJS installed](https://nodejs.org)

```
git clone https://github.com/zequez/reddit-placebot
cd reddit-placebot
npm install
```

## Configuration

Change `users.example.json` to `users.json` and add your username and password
of your account and all your throwaways.

## The target.bmp file

The target file must meet the following requirements:

  - Format: BMP
  - Dimensions: 1000x1000
  - Compression: NONE! Should weight about 3mb, 4 bytes per color
  - Colors: exactly the same colors used in the board
  - Transparency: Color `#ff00ffff` is considered transparent (a bright purple color), and will be ignored by the bots

You can check the colors on `colors.js`, but is easier to
import `board.example.bmp` to your image editor, and use the eyedropper tool
from there. You can use that image as a template and go from there too, covering
parts that you don't use in `#ff00ffff`

With an advanced image editor is recommended to have the board in a separate
layer so you actually know what you're modifying.

## Target Drawing

The bot downloads the board each time it's time to draw, so it only changes
the necessary pixels that don't match the target.

### Remote (for multiple people)

You can configure the target to be downloaded from a remote image by
settin on `config.js`:

- `autoupdateRemoteTarget: true`
- `REMOTE_TARGET_URL: "http://example.com/remote_target.bmp"`

The image will be downloaded before paining and saved to `target.bmp`.

### Local (just for your own bots)

Just use the file `target.bmp` and set `autoupdateRemoteTarget: false` on `config.js`.

## Bundle up changes

If you want to wait until multiple users are available to paint and do the
changes all at the same time, change the config:

- *bundleAccounts*: <Number 1-Infinity>

## Usage

```
  npm run start
```

It'll keep keep drawing forever and if it can't draw anymore it's gonna
wait until something breaks and fix it.

## Testing

LOL

You can `npm run watch`, but that's about it.

## Similar Projects

Thanks to [trosh/rplace](https://github.com/trosh/rplace) to figure out how to actually read the bitmap from the server. I just ported that to Node.

## License

MIT
