let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    progress: true
  },
  entry: {
    index: './src/index.js',
    about:'./src/about.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, 'css-loader', 'postcss-loader']
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'eslint-loader',
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },

    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"])
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunks: ['index']
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      minify: false,
      filename:'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: '关于',
      minify: false,
      filename:'about.html',
      template: path.resolve(__dirname, 'src/about.html'),
      chunks: ['about']
    })
  ]
}