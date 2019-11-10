const path = require('path');
const fs = require('fs');
const PROJECT_PATH = __dirname;


var config = {
   entry: './main.js',
   watch: true,
   output: {
      path:path.join(__dirname, "dist/js"),
      filename: 'index.js'
   },
   devServer: {
      inline: true
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
          loader: 'url-loader'
        }
      ]
   }
 }
module.exports = config;
