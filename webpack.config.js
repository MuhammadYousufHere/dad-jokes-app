const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: ["regenerator-runtime/runtime.js", "./src/main.js"],
  output: {
    path: path.join(__dirname + "/public"),
    filename: "bundle-index.js",
    assetModuleFilename: "assets/images/[name][ext]",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    static: "./public",
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        "**/*",
        path.join(process.cwd(), "public/**/*"),
      ],
    }),
  ],
};
