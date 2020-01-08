const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                        emitError: true,
                        formatter: require('eslint-friendly-formatter')
                    }
                }]
            },
            {
                test: /\.tsx?$/,
                loader: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ]
};
