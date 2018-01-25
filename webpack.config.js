const merge = require('webpack-merge');

const developmentConfig = require('./webpack.dev')
const productionConfig = require('./webpack.prod')
const commonConfig = require('./webpack.common')


module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  } else {
    return merge(commonConfig, developmentConfig);
  }
};
