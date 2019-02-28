const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    target: "web",
    entry: {
      clientScript: path.resolve('./src/clientScript.js'),
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new Dotenv({
        path: path.resolve(__dirname, './.env')
      })
    ],
    output: {
        path: __dirname+'/dist/',
        filename: "[name].js"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader',
            options: { inline: true, fallback: true }
          } 
        }
      ]
    }
}