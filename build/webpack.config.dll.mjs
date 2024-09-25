
import path from 'node:path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

import {fileURLToPath} from 'node:url'
const  __dirname = path.dirname(fileURLToPath(import.meta.url));

const dllPath = path.resolve(__dirname, '../static/dll');
export default {
    mode: 'production',
    entry: {
        vendors: ['react', 'prop-types', 'react-dom', 'react-router', 'dayjs', 'moment',
            'axios', 'react-router-dom', 'mtor',
            'regenerator-runtime/runtime',
            'core-js/stable',
        ],
    },

    output: {
        publicPath: '/dll',
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
