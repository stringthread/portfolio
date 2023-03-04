// This file is from https://posipan.com/webpack-ts-sass/

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/ts/index.ts",
    career: "./src/ts/career.ts",
    skill: "./src/ts/skill.ts",
    works: "./src/ts/works.ts",
  },

  output: {
    path: path.join(__dirname, "docs"),
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],

  devtool: "source-map",

  devServer: {
    static: {
      directory: path.join(__dirname, "docs"),
    },
    port: 9000,
  },

  watchOptions: {
    ignored: /node_modules/,
  },
};
