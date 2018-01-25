const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin =
  require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const extractTextPlugin = new ExtractTextPlugin({
  filename: '[name].[contenthash:8].css',
});

module.exports = {
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].[chunkhash:8].js',
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    extractTextPlugin,
    new CleanWebpackPlugin([path.join(__dirname, 'build')]),
    // Minify Javascript
    new BabiliPlugin(),
    // Minify CSS
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
      canPrint: false,
    }),
  ],
}
