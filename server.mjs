/** 用于开发环境的服务启动 * */
import express from 'express';
import undici from 'undici';
import bodyParser from 'body-parser';
import http from 'node:http';
import compression from 'compression'
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDev from './build/webpack.config.dev.js';




const app = express(); // 实例化express服务
app.use(bodyParser.json());
const { PORT = 8816, NODE_ENV : env} = process.env; // 服务启动端口号
app.use(historyApiFallback());
app.use(compression());


if (env === 'production') {
    app.use(express.static('dist', {
        maxAge: '1d',
        setHeaders(res, file) {
            if (file.indexOf('index.html') > -1) {
                res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5');
            }
        },
    }));
} else {
    const compiler = webpack(webpackConfigDev); // 实例化webpack
    app.use(webpackDevMiddleware(compiler, {
        // 挂载webpack小型服务器
        publicPath: webpackConfigDev.output.publicPath, // 对应webpack配置中的publicPath
    }));
    // 挂载HMR热更新中间件
    app.use(webpackHotMiddleware(compiler));
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
        }).then((result) => resp.send(result)).catch(e => resp.send('error'));
    } else {
        next();
    }
});

/** 启动服务 * */
app.listen(PORT, () => {
    console.log(`本地服务启动地址: http://localhost:${PORT}`);
});
