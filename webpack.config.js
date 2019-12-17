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
            template: resolve(__dirname + "/src/client/index.html"),
            filename: resolve(__dirname + './devBuild/client/index.html')
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: resolve(__dirname + "/src/client/ask.html"),
          filename: resolve(__dirname + "./devBuild/client/ask.html")
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: resolve(__dirname + "/src/client/getpage.html"),
          filename: resolve(__dirname + "./devBuild/client/getpage.html")
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: resolve(__dirname + "/src/client/login.html"),
          filename: resolve(__dirname + "./devBuild/client/login.html")
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: resolve(__dirname + "/src/client/answer.html"),
          filename: resolve(__dirname + "./devBuild/client/answer.html")
        })
   ]
}
