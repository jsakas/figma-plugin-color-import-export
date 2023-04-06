const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const { DefinePlugin } = require('webpack')
const PackageJSON = require('./package.json');

const path = require('path')

module.exports = (env, argv) => {
  const GA_ENABLED = argv.mode === 'production' ? true : false
  const SENTRY_ENABLED = argv.mode === 'production' ? true : false

  return {
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',

    entry: {
      ui: './src/app/index.tsx',
      code: './src/plugin/controller.ts',
    },

    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.(png|jpg|gif|webp|svg)$/, use: 'url-loader' },
        { test: /\.hbs$/i, use: 'raw-loader' },
      ],
    },

    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],

      extensions: ['.tsx', '.ts', '.jsx', '.js'],

      alias: {
        '@mui/material': '@mui/joy',
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'handlebars': path.resolve('./node_modules/handlebars/dist/handlebars.min.js'),
      }
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      SENTRY_ENABLED && new SentryCliPlugin({
        include: 'dist',
        ignore: ['node_modules'],
        release: PackageJSON.version,
        configFile: '.sentryclirc',
      }),
      new DefinePlugin({
        'SENTRY_ENABLED': GA_ENABLED,
        'GA_ENABLED': SENTRY_ENABLED,
      }),
      new HtmlWebpackPlugin({
        template: './src/app/index.ejs',
        filename: 'ui.html',
        chunks: ['ui'],
        cache: false,
        title: 'Color Import / Export',
        global: {
          SENTRY_ENABLED,
          GA_ENABLED
        }
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
    ].filter(Boolean),
  }
}
