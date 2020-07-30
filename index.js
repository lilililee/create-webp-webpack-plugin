'use strict'
const sharp = require('sharp')

const defaultOptions = {
  // match: /\.(png|jpe?g)$/,
  match: /\.(png)$/, // 对于压缩后的jpg转成无损webp体积会更大, 但是压缩后的png转成无损webp还能减少15%体积
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    // quality: 85
    lossless: true,
  },
}

module.exports = class CreateWebpWebpackPlugin {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options)
  }

  apply(compiler) {
    const match = this.options.match
    compiler.hooks.emit.tapAsync('WebpWebpackPlugin', async (compilation, callback) => {
      for (const filename in compilation.assets) {
        if (match.test(filename)) {
          const webp = await this._toWebp(compilation.assets[filename].source())
          compilation.assets[`${filename}.webp`] = {
            source: function () {
              return webp
            },
            size: function () {
              return webp.length
            },
          }
        }
      }

      callback()
    })
  }

  async _toWebp(input) {
    return sharp(input).webp(this.options.webp).toBuffer()
  }
}
