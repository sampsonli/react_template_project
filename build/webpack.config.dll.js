const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

const dllPath = path.resolve(__dirname, '../static/dll');
module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'prop-types', 'react-dom', 'react-router', 'react-redux', 'redux',
            'axios', 'classnames', 'redux-spring', 'react-router-dom',
            'regenerator-runtime/runtime',
            'core-js/modules/es.number.to-fixed',
            'core-js/modules/es.string.split',
            'core-js/modules/es.promise',
            'core-js/internals/collection-strong',
            'core-js/internals/collection',
            'core-js/internals/fix-regexp-well-known-symbol-logic',
            'core-js/internals/task',
            'core-js/internals/define-iterator',
            'core-js/internals/regexp-exec',
            'core-js/internals/iterate',
            'core-js/internals/object-create',
            'core-js/internals/microtask',
            'core-js/internals/internal-state',
            'core-js/internals/object-assign',
        ],
    },

    output: {
        publicPath: 'dll',
        filename: '[name].[chunkhash:8].dll.js',
        path: dllPath,
        library: '[name]_lib',
    },

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
