const path = require('path')
const CreateWebpWebpackPlugin = require('../index.js')
const { argv } = require('yargs')


const { type } = argv
const [imageLoader, webpType] = type.split('-')
const isUseImageLoader = imageLoader === 'yes'

let webp = {}
if (webpType === 'no') {
  webp = false
} else if (webpType === 'lossless') {
  webp.lossless = true
} else {
  webp.quality = +webpType
}

module.exports = {
  entry: {
    main: [path.resolve(__dirname, 'src/entry.js')],
  },
  output: {
    publicPath: '',
    // filename: 'js/[name].[hash:7].js',
    // chunkFilename: 'js/[id].[hash:7].js',
    path: path.resolve(__dirname, 'dist', type),
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: '[name].[hash:7].[ext]',
            },
          },
          isUseImageLoader && {
            loader: 'image-webpack-loader',
            options: {},
          },
        ].filter(Boolean)
      },
    ],
  },
  plugins: [
    webp && new CreateWebpWebpackPlugin({
      webp,
    }),
  ].filter(Boolean)
}
