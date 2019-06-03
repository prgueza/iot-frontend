const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = env => ({
  watch: env && env.watch,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  entry: './src/bundler.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins() { // post css plugins, can be exported to postcss.config.js
                return [
                  precss,
                  autoprefixer,
                ];
              },
            },
          }, {
            loader: 'sass-loader', // compiles SASS to CSS
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '*'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL) || JSON.stringify('http://localhost:4000/'),
        TIMEOUT: 50000,
      },
    }),
  ],
});
