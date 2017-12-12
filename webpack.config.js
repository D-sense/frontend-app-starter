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
                test:  /\.(gif|png|jpeg|jpg|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      bypassOnDebug: true,
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      // optipng.enabled: false will disable optipng
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      // the webp option will enable WEBP
                      webp: {
                        quality: 75
                      }
              
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
    ],
    performance: {
        maxAssetSize: 100,
        maxEntrypointSize: 100,
        hints: 'warning'
      }
};