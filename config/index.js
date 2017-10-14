
'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const merge = require('webpack-merge');

// Load config in the order of existance: local.env, .env
const envConfig = ['local.env', '.env'].reduce((config, file) => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath) && !config) {
    console.log('Using env config', file);
    config = dotenv.parse(fs.readFileSync(filePath));
  }
  return config;
}, null);

module.exports = {
  build: {
    env: merge(envConfig, require('./prod.env')),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: merge(envConfig, require('./dev.env')),
    port: process.env.PORT || 3000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
