const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

const dllPath = path.resolve(__dirname, '../static/dll');
module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'prop-types', 'react-dom', 'react-router', 'react-redux', 'redux', 'dayjs',
            'axios', 'classnames', 'redux-spring', 'react-router-dom',
            'regenerator-runtime/runtime',
            'core-js/stable',
        ],
    },

    output: {
        publicPath: 'dll',
        filename: '[name].[chunkhash:8].dll.js',
        path: dllPath,
        library: '[name]_lib',
    },
    target: ['web', 'es5'],
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(dllPath, '[name]-manifest.json'),
            name: '[name]_lib',
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: dllPath,
        }),
    ],
};
