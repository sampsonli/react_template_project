/** 用于开发环境的服务启动 * */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// express服务器端框架
const env = process.env.NODE_ENV; // 模式（dev开发环境，production生产环境）
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack'); // webpack核心
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackDevMiddleware = require('webpack-dev-middleware'); // webpack服务器
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackHotMiddleware = require('webpack-hot-middleware'); // HMR热更新中间件
// eslint-disable-next-line
const undici = require("undici");
// eslint-disable-next-line
const bodyParser = require('body-parser');
// eslint-disable-next-line
const http = require('http');
// eslint-disable-next-line
const compression = require('compression');
// eslint-disable-next-line
const historyApiFallback = require('connect-history-api-fallback');

const webpackConfig = require('./build/webpack.config.dev.js'); // webpack开发环境的配置文件

const app = express(); // 实例化express服务
app.use(bodyParser.json());
const { PORT = 3000 } = process.env; // 服务启动端口号
app.use(historyApiFallback());
if (env === 'production') {
    // 如果是生产环境，则运行build文件夹中的代码
    app.use(compression());
    app.use(express.static('dist', {
        maxAge: '1d',
        setHeaders(res, file) {
            if (file.indexOf('index.html') > -1) {
                res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5');
            }
        },
    }));
} else {
    const compiler = webpack(webpackConfig); // 实例化webpack
    app.use(webpackDevMiddleware(compiler, {
        // 挂载webpack小型服务器
        publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
    }));
    // 挂载HMR热更新中间件
    app.use(webpackHotMiddleware(compiler));
    // 所有请求都返回index.html
    // app.get('/', (req, res, next) => {
    //     const filename = path.join(DIST_DIR, 'index.html');

    //     // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
    //     compiler.outputFileSystem.readFile(filename, (err, result) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         res.set('content-type', 'text/html');
    //         res.send(result);
    //         res.end();
    //     });
    // });
}

app.use((req, resp, next) => {
    if (req.originalUrl.indexOf('/user') > -1) {
        const headers = { ...req.headers };
        delete headers.connection;
        delete headers['content-length'];
        delete headers['accept-encoding'];
        headers.host = 'www.fastmock.site';
        undici.request(`https://www.fastmock.site/mock/076e2f3ffbb3afe387cb325e29dc2d2b/v1${req.originalUrl}`, {
            method: req.method,
            headers,
            body: req.body && JSON.stringify(req.body),
        }).then(({ body, statusCode }) => {
            if (statusCode === 200) {
                return body.json();
            }
            return Promise.reject(new Error('错误'));
        }).then((result) => resp.send(result));
    } else {
        next();
    }
});

/** 启动服务 * */
app.listen(PORT, () => {
    console.log(`本地服务启动地址: http://localhost:${PORT}`);
});
