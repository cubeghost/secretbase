require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require('babel-register')({
  only: /src\/constants/
});
const { STRICT_GRID_SPACING } = require('./src/constants');

const config = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/build')
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
    }
  },
  module : {
    loaders : [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                url: false,
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                data: `$gridSpacing: ${STRICT_GRID_SPACING}px;`,
                includePaths: [
                  path.resolve(__dirname, 'src/styles')
                ]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devtool: 'inline-source-map',
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin());
  config.devtool = undefined;
}

module.exports = config;
