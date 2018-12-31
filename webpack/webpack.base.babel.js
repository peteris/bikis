/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/dist/',
    },
    options.output
  ), // Merge with env dependent settings
  module: {
    loaders: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel',
        exclude: /node_modules/,
        query: options.babelQuery,
      },
      {
        // Transform our own .css files with PostCSS and CSS-modules
        test: /\.css$/,
        exclude: /node_modules/,
        loader: options.cssLoaders,
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'file?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[hash].[ext]',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.json$|\.topojson$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]),
  postcss: options.postcssPlugins,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.react.js'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: false, // Don't show stats in the console
  progress: true,
});
