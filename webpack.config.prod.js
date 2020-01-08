const path = require('path');
const webpack = require('webpack');
const webapckMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

const banner = `
@license ${pkg.name} v${pkg.version}

Copyright (c) Chowa Techonlogies Co.,Ltd.(http://www.chowa.cn).

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
`;

module.exports = webapckMerge(webpackBaseConfig, {
    entry: {
        'react-chowa': [
            path.join(__dirname, 'components'),
            path.join(__dirname, 'components/styles')
        ],
    },
    mode: 'production',
    performance: {
        hints: false
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'react-chowa'
    },
    stats: {
        colors: true,
        chunks: false,
        errorDetails: true,
        timings: true,
        children: false
    },
    externals: {
        classnames: 'classnames',
        moment: 'moment',
        prismjs: 'prismjs',
        react: 'react',
        'react-dom': 'react-dom',
        'prop-types': 'prop-types',
        'resize-observer': 'resize-observer',
        'react-dnd': 'react-dnd',
        'react-dnd-html5-backend': 'react-dnd-html5-backend'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        },
        {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: '../iconfonts/[name].[ext]'
            }
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                extractComments: false,
                uglifyOptions: {
                    ecma: 6,
                    warnings: false,
                    keep_classnames: true,
                    keep_fnames: true,
                    mangle: true
                }
            })
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.BannerPlugin({
            banner: banner
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: true
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /react-chowa\.css/,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                parser: require('postcss-safe-parser'),
                autoprefixer: false
            },
            canPrint: true
        })
    ]
});
