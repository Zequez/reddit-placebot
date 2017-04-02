# Reddit Place Bot

This is a bot I made for the Reddit [/r/place](https://www.reddit.com/r/place/) event of 2017 April Fools Day.

I made this bot to protect our national flag on [/r/argentina](https://www.reddit.com/r/argentina/)

![This is how it looks now, but it might change when you read it, visit the placebot-argentina-target repo to see how it actually is right now](https://raw.githubusercontent.com/Zequez/reddit-placebot/master/current_target_that_might_not_be_updated.png)

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

## About Colors

Since '.BMP' files do not support transparent pixels, the color `#ff00ffff` (yes the transparency channel too) is used to denote transparent pixels. These will be ignored by the Placebot.

You have to use the exact same colors as the board or the app is gonna throw
an error, it's not smart enough to guess the colors based on similarity.

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
