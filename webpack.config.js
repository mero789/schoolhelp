const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join, resolve } = require('path')
module.exports = {
  entry: "./src/client/js/main.jsx",
  output: {
    path: __dirname + "./devBuild/client/js",
    filename: "bundle.js"
  },
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: resolve(__dirname + "/src/client/index.html"),
            filename: resolve(__dirname + './devBuild/client/index.html')
        })
   ]
}
