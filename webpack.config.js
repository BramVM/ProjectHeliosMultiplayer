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
      new webpack.DefinePlugin({
        'process.env': {
          WEBSOCKET_URL: process.env.WEBSOCKET_URL,
          PORT: process.env.PORT
        }
      }),
      new Dotenv({
        path: path.resolve(__dirname, './.prod.env')
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