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
    student: path.resolve(__dirname, 'src/pages/student.jsx'),
    admin: path.resolve(__dirname, 'src/pages/admin.jsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
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
      filename: 'landing.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['teacher'],
      title: 'Teachers',
      filename: 'teacher.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['student'],
      title: 'Students',
      filename: 'student.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['admin'],
      title: 'Admin Panel',
      filename: 'admin.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
