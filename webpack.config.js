const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const path = require('path')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/app/index.tsx',
    code: './src/plugin/controller.ts',
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
    ],
  },

  resolve: { 
    plugins: [
      new TsconfigPathsPlugin(),
    ],
    
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    }
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: 'ui.html',
      chunks: ['ui'],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
})