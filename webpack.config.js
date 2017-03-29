const path = require('path');
const fs = require('fs');

const PROJECT_PATH = __dirname;

const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssInherit = require('postcss-inherit');
const postcssUrl = require('postcss-url');
const precss = require('precss');
function postcssUrlResolver(url, decl, from, dirname) {
  if (url.match(/^data:/g)) {
    return url;
  }
  const absoluteUrl = path.join(dirname, url);
  const relativeFromProjectUrl = path.relative(PROJECT_PATH, absoluteUrl);
  const ret = `/${relativeFromProjectUrl}`;
  return ret;
}


var config = {
   entry: './main.js',

   output: {
      path:'./',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 80
   },
   

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
               presets: ['es2015', 'react']
            }
         },{
           test: /\.css$/,
           loaders: [
               'style-loader',
               'css-loader?root=${PROJECT_PATH}&discardDuplicates&discardComments',
               'postcss-loader'
             ]
          }
      ]
   },
   postcss: function postcss(wp) {
    return [
      // require('stylelint'),
      postcssImport({
        addDependencyTo: wp,
        plugins: [
          postcssUrl({
            url: postcssUrlResolver,
          }),
        ],
      }),
      precss,
      postcssInherit,
      autoprefixer,
    ];
  },
}

module.exports = config;
