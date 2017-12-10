//import { read } from 'fs';

const path = require ('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');


module.exports = {
    entry: './js/factory.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },

    module: {
        rules: [
            {   
                test:  /\.(gif|png|jpe?g|svg)$/,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true,
                    },
                  },
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                          plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                              require('precss'),
                              require('autoprefixer')
                            ];
                          }
                        }

                    }, {
                        loader: 'sass-loader'    
                    }],
                    fallback: 'style-loader'
                }),
            }
        ]
    },    
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
          })
    ]
};