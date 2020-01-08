const path = require("path");
const webpack = require("webpack");
const argv = require("yargs").argv;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopment = argv.mode === "development";
const isProduction = !isDevelopment;
const distPath = path.resolve(process.cwd(), "dist");

const config = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./js/index.js"
  },
  output: {
    filename: "js/bundle.js",
    path: distPath
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.(sc|sa)ss$/,
        exclude: /node_modules/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
          // "resolve-url-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader"
        }
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "img/[name].[ext]"
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CopyWebpackPlugin([{ from: "./img", to: "img" }]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.$": "jquery",
      Popper: ["popper.js", "default"]
    })
  ],
  optimization: isProduction
    ? {
        minimizer: [
          new UglifyJsPlugin()
        ]
      }
    : {},
  devServer: {
    stats: "errors-only",
    host: '192.168.1.7'
    
  }
};

module.exports = config;
