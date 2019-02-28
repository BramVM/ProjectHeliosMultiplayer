const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = {
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