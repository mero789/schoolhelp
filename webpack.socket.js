const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join, resolve } = require('path')
module.exports = {
  entry: "./src/client/chat/js/main.jsx",
  output: {
    path: __dirname + "./devBuild/client/chat/js",
    filename: "bundle.js"
  },
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: [
      {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/react']
          }
        }
      ]
    }
    ]
  },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: resolve(__dirname + "/src/client/chat/index.html"),
            filename: resolve(__dirname + './devBuild/client/chat/index.html')
        })
   ]
}
