import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import WebpackMD5Hash from 'webpack-md5-hash'

export default {
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, 'src/index'),
        vendor: path.resolve(__dirname, 'src/vendor')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src/A.Product.Web/wwwroot/dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    module: {
        //loaders:[
            //{test: /\.js$/, exclude: /node_modules/, loaders : ['babel-loader']},
        //    {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
        //],
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                        loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'application/font-woff',
                      name: '[name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'application/octet-stream',
                      name: '[name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'image/svg+xml',
                      name: '[name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]'
                    }
                  }
                ]
              },
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].[contenthash].css"),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            //favicon: 'src/favicon.ico',
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            },
            inject: true,
            //Error reporting token for track.js
            trackJSToken: 'b55c6fb689114f97accebce7f0660201'
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new WebpackMD5Hash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
      },
}