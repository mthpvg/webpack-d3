const merge = require('webpack-merge');


module.exports = {
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '8080',
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
