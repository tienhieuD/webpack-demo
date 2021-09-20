const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    main: ['./src/fid-oauth-v3.js'],
  },
  output: {
    filename: 'fid-oauth-v3.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/')
    },
    extensions: ['.wasm', '.mjs', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // File lớn hơn 8kb thì tạo file để vào dist thay vì convert sang base64
              limit: 30*1024,
              // name: 'images/[name].[ext]',
              name: '[path][name].[ext]',
            },
          },
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          { 
            loader: 'style-loader', 
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
      },

    ]
  }
}
