'use strict'
const sharp = require('sharp')

const defaultOptions = {
  // match: /\.(png|jpe?g)$/,
  match: /\.(png|gif|svg)$/, // 对于压缩后的jpg转成无损webp体积会更大
  // quality: 80,
  // http://sharp.dimens.io/en/stable/api-output/#webp
  webp: {
    // quality: 75
    lossless: true
  }
  // limit: 0,
  // inject: false,
  // imgSrc: 'data-src',
  // minify: true,
  // injectCode: '',
  // checkStrict: false,
  // format: '[name].[ext].webp'
}

module.exports = class CreateWebpWebpackPlugin {
  constructor (options) {
    this.options = Object.assign({}, defaultOptions, options)
  }

  apply (compiler) {
    const match = this.options.match
    compiler.hooks.emit.tapAsync(
      'WebpWebpackPlugin',
      async (compilation, callback) => {
        for (const filename in compilation.assets) {
          if (match.test(filename)) {
            const webp = await this._toWebp(
              compilation.assets[filename].source()
            )
            compilation.assets[`${filename}.webp`] = {
              source: function () {
                return webp
              },
              size: function () {
                return webp.length
              }
            }
          }
        }

        callback()
      }
    )
  }

  async _toWebp (input) {
    return sharp(input)
      .webp(this.options.webp)
      .toBuffer()
  }
}
