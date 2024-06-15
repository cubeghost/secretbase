require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { globSync } = require('glob');
const imageSize = require('image-size');

require('@babel/register')({
  only: [/src\/constants/]
});
const { STRICT_GRID_SPACING, POOF_DURATION } = require('./src/constants');

const config = {
  mode: process.env.CONTEXT === 'dev' ? 'development' : 'production', 
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/build'),
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif|mp3|eot|svg|ttf|otf|woff|woff2)$/,
        include: path.resolve(__dirname, 'src/'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
      {
        test: /\.s?css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: /\.scss$/,
                exportGlobals: true,
                localIdentName: "[folder]__[local]--[hash:base64:5]",
              }
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, 'src/styles')
                ]
              }
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devtool: 'inline-source-map',
};

if (process.env.CONTEXT === 'production') {
  config.devtool = 'source-map';
  config.optimization.minimize = true;
  config.optimization.minimizer = [new TerserPlugin()];
}

const staticRenderConfig = {
  mode: config.mode,
  devtool: config.devtool,
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    staticRender: './src/staticRender.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/build'),
    publicPath: '/build/',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: config.module.rules,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BASE_DIMENSIONS: JSON.stringify(Object.fromEntries(
        globSync('public/assets/bases/base_*.png').map((filepath) => {
          const { width, height } = imageSize(filepath);
          return [path.parse(filepath).name, [width, height]]
        })
      ))
    }),
  ],
};

module.exports = [config, staticRenderConfig];
