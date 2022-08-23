const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const publicUrl = {
  https: 'https://time-note.onrender.com/',
};

module.exports = {
  // 進入點
  entry: './index.js',
  // 輸出
  output: {
    // 輸出目錄
    path: path.resolve(__dirname, 'dist'),

    // 請參考 dist/index.html裡的script src是引用什麼檔案
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          // lazy-loading
          plugins: ['@babel/plugin-syntax-dynamic-import'],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {},
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Dotenv({
      // 允許讀取 process.env 下的任意系統變量
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      // 解決 onClick 失效
      name: 'index.html',
      inject: false,
      template: 'public/index.html',
      PUBLIC_URL: publicUrl.https,
    }),
    // 複製靜態檔案
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/assets/',
          to: 'assets',
        },
      ],
    }),
  ],
  mode: 'production',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/'),
    },
    liveReload: true,
    port: 9000,
    devMiddleware: {
      publicPath: publicUrl.https,
    },

    // for browserouter
    historyApiFallback: true,
  },
};
