const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

config = {
    mode: "development",
    target: "node",
    entry: {
      serverScript: path.resolve('./src/serverScript.js'),
    },
    plugins: [
      new Dotenv()
    ],
    output: {
        path: __dirname+'/dist/',
        filename: "[name].js"
    },
    externals: [nodeExternals()],
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
      WEBSOCKET_URL: JSON.stringify(process.env.WEBSOCKET_URL),
      PORT: JSON.stringify(process.env.PORT),
      IDENTITY_URL: JSON.stringify(process.env.IDENTITY_URL),
      CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
      CALLBACK_URL: JSON.stringify(process.env.CALLBACK_URL),
      API_URL: JSON.stringify(process.env.API_URL),
      PLAYER_CLIENT_ID: JSON.stringify(process.env.PLAYER_CLIENT_ID),
      PLAYER_CLIENT_SECRET: JSON.stringify(process.env.PLAYER_CLIENT_SECRET)
    }
  }))
}
else {
  config.plugins.push(new Dotenv({
    path: path.resolve(__dirname, './.env')
  }))
}
module.exports = config;