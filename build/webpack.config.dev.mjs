import path from 'node:path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {fileURLToPath} from 'node:url'

const ctxPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../');
const srcPath = path.join(ctxPath, 'src');
export default {
    mode: 'development',
    // stats: 'errors-only',
    // devServer: {
    //     proxy: [
    //         {
    //             context: ['/user'],
    //             target: 'https://www.fastmock.site/mock/076e2f3ffbb3afe387cb325e29dc2d2b/v1'
    //         },
    //     ],
    //     compress: true,
    //     port: 8816,
    // },
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr', // webpack热更新插件，就这么写
            path.resolve(srcPath, './index.js'),
        ],
    },
    output: {
        path: path.join(ctxPath, 'dist'), // 将文件打包到此目录下
        publicPath: '/', // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
        filename: '[name].js',
        chunkFilename: '[name]_chunk.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    target: ['web', 'es5'],
    devtool: 'inline-source-map', // 报错的时候在控制台输出哪一行报错
    context: ctxPath,
    module: {
        rules: [
            {
                // .js .jsx用babel解析
                test: /\.[tj]sx?$/,
                include: srcPath,
                exclude: /node_modules/,
                use: [
                    'babel-loader?cacheDirectory',
                ],
            },
            {
                // .less 解析
                test: /\.(less|css)$/,
                include: /(node_modules|assets)/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    // 'font-size-base': '.14rem',
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
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: '[name]__[local]-[hash:base64:5]',
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
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.json'],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new CopyWebpackPlugin({patterns: [{from: path.join(ctxPath, 'static')}]}),
        new HtmlWebpackPlugin({
            // 根据模板插入css/js等生成最终HTML
            filename: 'index.html', // 生成的html存放路径，相对于 output.path
            template: path.join(srcPath, 'index.ejs'), // html模板路径
            inject: true, // 是否将js放在body的末尾
            // favicon: path.join(ctxPath, 'static/favicon.ico'), // 自动把根目录下的favicon.ico图片加入html
        }),
    ],
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
                    test: /[\\/]node_modules[\\/](@babel|core-js|css-loader|style-loader|webpack-hot-middleware|ansi-html|html-entities|querystring)/,
                },

                vendors: {
                    name: 'vendors',
                    chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    reuseExistingChunk: true,
                    priority: 0,
                    minChunks: 1,
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/,
                },

            },
        },
    },
};
