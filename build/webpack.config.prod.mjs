
import path from 'node:path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import vendorManifest from '../static/dll/vendors-manifest.json' with {type: 'json'};
import bundleConfig from '../static/dll/bundle-config.json' with {type: 'json'};

import {fileURLToPath} from 'node:url'
const  __dirname = path.dirname(fileURLToPath(import.meta.url));


const ctxPath = path.resolve(__dirname, '../');
const srcPath = path.join(ctxPath, 'src');

export default {
    mode: 'production',
    entry: {
        app: [srcPath],
    },
    output: {
        path: path.join(ctxPath, 'dist'), // 将文件打包到此目录下
        publicPath: '/', // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
        filename: '[name].[contenthash:6].bundle.js',
        chunkFilename: '[name].[contenthash:6].chunk.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    target: ['web', 'es5'],
    context: ctxPath,
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                include: srcPath,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                // .less 解析
                test: /\.(less|css)$/,
                include: /(node_modules|assets)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    // 'font-size-base': '.14rem',
                                    // 'primary-color': '#1DA57A',
                                },
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                // .less 解析
                test: /\.(less|css)$/,
                exclude: /(node_modules|assets)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: '[local]-[hash:base64:5]',
                                exportLocalsConvention: 'camelCase',
                            },
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                // More information here https://webpack.js.org/guides/asset-modules/
                type: 'asset',
            },
        ],
    },
    resolve: {
        alias: {
            '~': srcPath,
        },
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.DllReferencePlugin({
            context: ctxPath,
            manifest: vendorManifest,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:6].css',
            chunkFilename: '[id].[contenthash:6].chunk.css',
        }),
        new CopyWebpackPlugin({patterns: [{from: path.join(ctxPath, 'static')}]}),
        new HtmlWebpackPlugin({
            // 根据模板插入css/js等生成最终HTML
            filename: 'index.html', // 生成的html存放路径，相对于 output.path
            template: path.join(srcPath, 'index.ejs'), // html模板路径
            // favicon: path.join(ctxPath, 'static/favicon.ico'), // 自动把根目录下的favicon.ico图片加入html
            minify: {minifyJS: true, collapseWhitespace: true},
            inject: true, // 是否将js放在body的末尾
            dllName: bundleConfig.vendors.js,
        }),
        new BundleAnalyzerPlugin({
            // eslint-disable-next-line no-undef
            analyzerMode: process.env.ANALYSE ? 'server' : 'disabled',
        }),
    ],
    performance: {
        maxAssetSize: 1024 * 1024,
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all', // Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
            minSize: 0,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            cacheGroups: {
                async: {
                    chunks: 'async',
                    minSize: 3000,
                    minChunks: 2,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    priority: -1,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: 'commons',
                    chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    reuseExistingChunk: true,
                    priority: 1,
                    minChunks: 1,
                    enforce: true,
                    test: /[\\/]node_modules[\\/](@babel|core-js|css-loader|style-loader|ansi-html|html-entities|querystring)/,
                },

            },
        },
    },
};
