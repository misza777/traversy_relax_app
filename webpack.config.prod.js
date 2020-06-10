const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  mode: env,
  devtool: "source-map",
  entry: {
    main: "./app/js/app.js",
    // vendor: "./app/js/vendor.js",
  },
  output: {
    filename: "[name]-bundle-[contenthash:6].js",
    path: path.resolve(__dirname, "build"),
    // publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[contenthash:6].[ext]",
              outputPath: "images",
              // publicPath: "images",
            },
          },

          // {
          // loader: "image-webpack-loader",
          // ,
          // options: {
          //   mozjpeg: {
          //     quality: 70,
          //     progressive: true
          //   }
          // }
          // },
        ],
      },
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
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      title: "mishiko portfolio",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
      },
      // favicon: "./app/images/favicon-32x32.png",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./app/about.html",
    //   filename: "about.html",
    //   favicon: "./app/images/favicon-32x32.png",
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./app/work.html",
    //   filename: "work.html",
    //   favicon: "./app/images/favicon-32x32.png",
    //   // chunks: ["main","vendor"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./app/contact.html",
    //   filename: "contact.html",
    //   favicon: "./app/images/favicon-32x32.png",
    //   // chunks: ["main"],
    // }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:6].css",
      chunkFilename: "[id].css",
    }),
    new CopyPlugin([
      {
        from: "app/images/projects",
        to: "images/projects",
      },
    ]),
  ],
};
