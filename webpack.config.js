var path = require('path');

module.exports = {
  entry: './public/bundler.jsx',
  output: { path: path.resolve(__dirname, 'public/dist'), filename: 'bundle.js'},
  module: {
    rules: [
      {
        test: /\.sass?$/,
        use: [
        {
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compile Sass to CSS
        }]
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_nodules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      // FONTS LOADERS
      {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      }],
  },
};
