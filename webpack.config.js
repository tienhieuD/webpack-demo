const path = require('path')
const webpack = require('webpack')

module.exports = {
  // mode: 'development',
  // devtool: 'inline-source-map',
  entry: {
    main: ['./src/index.js', './src/home.js'],
    myTest: './src/my-test.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // "start": "webpack serve"
    contentBase: './dist'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    // https://kipalog.com/posts/Config-alias-chuan-trong-webpack
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

        // moved to .eslintrc
        // options: {
        //   // eslint options (if necessary)
        //   rules: {
        //     quotes: ["error", "double"]
        //   }
        // },
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
          // 'style-loader',
          { 
            loader: 'style-loader', 
            // options: { insert: 'body' }
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
