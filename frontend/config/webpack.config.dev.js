const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getClientEnvironment = require('./env');
const InterpolateHTMLPlugin = require('./plugins/InterpolateHTMLPlugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');
const paths = require('./paths');
const DevServerConfig = require('./webpackDevServer.config');

const cssFilename = '[name].[hash:8].css';

const extractTextPluginOptions = {
  filename: cssFilename,
  allChunks: true,
  publicPath: Array(cssFilename.split('/').length).join('../')
};

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: paths.appSrc,
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: paths.publicPath
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          allChunks: true,
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                minimize: false,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                url: true,
                minimize: false,
                sourceMap: true
              }
            }
          ]
        })
      },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(ico|jpg|svg|png)$/, use: 'file-loader' },
      {
        test: /\.(|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: 'index.html',
      inject: true
    }),
    new InterpolateHTMLPlugin(env.raw),
    new webpack.DefinePlugin(env.stringified),
    new ExtractTextPlugin(extractTextPluginOptions),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  devServer: DevServerConfig,
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
};
