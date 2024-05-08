const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const browser = process.env.BROWSER_TARGET || 'chrome';

module.exports = {
  devtool: "source-map",
  entry: {
    popup: "./src/popup",
    background: "./src/background",
    content: "./src/content",
    options: "./src/options",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, `dist/${browser}`),
  },
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER_TARGET': JSON.stringify(browser)
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `./manifest.${browser}.json`, to: 'manifest.json' },
        { from: "static" }
      ],
    }),
  ],
};
