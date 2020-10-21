const path = require("path");
//const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const CopyPlugin = require("copy-webpack-plugin");
require("regenerator-runtime/runtime");

module.exports = {
  entry: {
    Translations: ["./src/translations.js"],
    SubscriptionMachinePLPCode: ["./src/index.ts", "./src/styles/style.scss"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist",
  },
  mode: "production",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
    splitChunks: { chunks: "async" },
  },
  // output: {
  //   filename: "main.js",
  // },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     [
          //       "@babel/env",
          //       {
          //         targets: {
          //           ie: "11",
          //         },
          //       },
          //     ],
          //   ],
          //   plugins: [
          //     [
          //       "@babel/plugin-transform-runtime",
          //       {
          //         regenerator: true,
          //       },
          //     ],
          //     ["transform-remove-console", { exclude: ["error", "warn"] }],
          //   ],
          // },
        },
      },
      // {
      //   test: /\.css$/,
      //   exclude: /styles\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
      // {
      //   test: /styles\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      // {
      //   test: /\.(s*)css$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: { minimize: false },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(png|svg|jpg|gif|ico)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         esModule: false,
      //         name: "assets/[name].[ext]",
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //   template: "./src/index.html",
    //   filename: "./index.html",
    // }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
    new MinifyPlugin(),
    new CleanWebpackPlugin(),
    //new CopyPlugin([{ from: "src/favicon.ico", to: "./favicon.ico" }]),
  ],
};
