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

    401: path.resolve(__dirname, 'src/pages/401.jsx'),
    403: path.resolve(__dirname, 'src/pages/403.jsx'),
    404: path.resolve(__dirname, 'src/pages/404.jsx'),
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
    new HtmlWebpackPlugin({
      chunks: ['student'],
      title: 'Students',
      filename: 'student/index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['401'],
      title: '401 Unauthorized',
      filename: '401/index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['403'],
      title: '403 Forbidden',
      filename: '403/index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['404'],
      title: '404 Not found',
      filename: '404/index.html',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
