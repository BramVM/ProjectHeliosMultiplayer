const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

var config = {
    mode: "development",
    target: "web",
    entry: {
      clientScript: path.resolve('./src/clientScript.js'),
    },
    plugins:[
      new CleanWebpackPlugin(['dist']),
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
if(process && process.env){
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      WEBSOCKET_URL: process.env.WEBSOCKET_URL,
      PORT: process.env.PORT
    }
  }))
}
else {
  config.plugins.push(new Dotenv({
    path: path.resolve(__dirname, './.env')
  }))
}
module.exports = config;