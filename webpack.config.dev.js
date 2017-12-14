import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

export default {
    devtool: 'cheap-eval-source-map',
    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],
    target: 'web',
    output: {
        path:path.resolve(__dirname, 'src/A.Product.Web/wwwroot/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        loaders:[
            {
                test: /\.jsx?$/, exclude: /node_modules/, 
                use : ['babel-loader']
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader', {
                        loader: 'css-loader', options: { sourceMap: true}
                    }, {
                        loader: 'postcss-loader',options: {plugins: () => [require('autoprefixer')], sourceMap: true}
                    }, {
                        loader: 'sass-loader', options: {includePaths: [path.resolve(__dirname, 'src', 'scss')], sourceMap: true}
                    }
                ]
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/, 
                use: ['file-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                use: [{loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff'}}]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/octet-stream'}}]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml'}}]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [{loader: 'file-loader',options: {name: '[name].[ext]'}}]
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
}