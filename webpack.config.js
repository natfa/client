const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.jsx', '.js'],
    mainFiles: ['index'],
  },
  entry: {
    landing: path.resolve(__dirname, 'src/pages/landing.jsx'),
    teacher: path.resolve(__dirname, 'src/pages/teacher.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]/index.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|.git|build)/,
        use: [
          'babel-loader',
        ],
      },

      {
        test: /\.(css)$/,
        exclude: /(node_modules|.git|build)/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['landing'],
      title: 'Log In',
      filename: 'landing/index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['teacher'],
      title: 'Teachers',
      filename: 'teacher/index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
