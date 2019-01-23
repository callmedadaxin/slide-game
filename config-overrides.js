module.exports = function override(config, env) {
  //do stuff with the webpack config...
  var CompressionWebpackPlugin = require("compression-webpack-plugin");

  config.plugins.push(new CompressionWebpackPlugin({}));

  return config;
};
