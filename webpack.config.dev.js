const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const copyPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  mode: env,

  entry: {
    main: "./app/js/app.js",
    vendor: "./app/js/vendor.js",
  },

  devtool: "inline-source-map",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  devServer: {
    open: true,
    publicPath: "/",
    contentBase: path.resolve(__dirname, "/app"),
    compress: true,
    port: 3500,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["@babel/preset-env", { useBuiltIns: "usage", corejs: "2.0.0" }],
          ],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      // {
      // test: /\.(jpg|png|svg|gif|jpeg)$/,
      // use: "file-loader",
      // },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]_[contenthash:6].[ext]",
            outputPath: "images",
            // publicPath: "images",
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  plugins: [
    //ladowanie jquery
    // new webpack.ProvidePlugin({
    // $: "jquery",
    // jQuery: "jquery",
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "index.html",
      title: "Mishiko portfolio",
      favicon: "./app/images/favicon-32x32.png",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./app/about.html",
    //   filename: "about.html",
    //   favicon: "./app/images/favicon-32x32.png",
    //   chunks: ["main"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./app/work.html",
    //   filename: "work.html",
    //   favicon: "./app/images/favicon-32x32.png",
    //   chunks: ["main"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./app/contact.html",
    //   filename: "contact.html",
    //   favicon: "./app/images/favicon-32x32.png",
    //   chunks: ["main"],
    // }),
    new webpack.HotModuleReplacementPlugin(),
    // new copyPlugin([
    // {
    // from: "app/images",
    // to: "images",
    // },
    // ]),
  ],
};
