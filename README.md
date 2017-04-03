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

## The Target Image File

It can be a PNG, JPG or BMP file of any size or compression.

To change the position of the board you want to paint the target in:

- `targetStartX*: 0-999`
- `targetStartY*: 0-999`

Transparent pixels are just transparent pixels in PNG, or #ff00ff (for legacy reasons)
and will be ignored by the bot.

### Colors

You can use any colors and will try to find the closest match. The available
board colors are visible in the file /src/colors.js. But it's better if you use
and eyedropper tool from a board image.

## Target Drawing

The bot downloads the board each time it's time to draw, so it only changes
the necessary pixels that don't match the target.

### Remote (for multiple people)

You can configure the target to be downloaded from a remote image by
settin on `config.js`:

- `useRemoteTarget: true`
- `REMOTE_TARGET_URL: "http://example.com/remote_target.bmp"`

The image will be downloaded before paining and saved to `images/remote_target`.

### Local (just for your own bots)

- `useRemoteTarget: false`
- `LOCAL_TARGET_FILE: __dirname + '/images/target.png'`

## Bundle up changes

If you want to wait until multiple users are available to paint and do the
changes all at the same time, change the config:

- `bundleAccounts: <Number 1-Infinity> (default = 8)`

## Usage

```
  npm run start
```

It'll keep keep drawing forever and if it can't draw anymore it's gonna
wait until something breaks it and fix it.

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
