const path = require('path');
const webpack = require('webpack');
const webapckMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

function windows2posix(themeFilePath) {
    return path.resolve(__dirname, themeFilePath).replace(/\\/g, '/');
}

module.exports = webapckMerge(webpackBaseConfig, {
    entry: {
        app: [
            path.join(__dirname, 'dev/index.js'),
            path.join(__dirname, 'components/styles')
        ],
        vender: [
            'react',
            'react-dom',
            'prop-types',
            'classnames',
            'react-dnd',
            'react-dnd-html5-backend',
            'resize-observer-polyfill',
            'prismjs',
            'moment'
        ]
    },
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'static/js/[name].[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader',
                    options: {
                        prependData: `@import '${windows2posix('dev/theme.scss')}';`
                    }
                }
            ]
        },
        {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: 'iconfonts/[name].[ext]'
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'dev/index.html'),
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new StyleLintPlugin()
    ],
    optimization: {
        splitChunks: {
            name: 'vender'
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: process.env.PORT || 8066,
        open: true,
        hot: true,
        inline: true,
        overlay: true,
        compress: true
    }
});
