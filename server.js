/** 用于开发环境的服务启动 * */
// eslint-disable-next-line
const express = require('express');
// eslint-disable-next-line
const undici = require('undici');
// eslint-disable-next-line
const bodyParser = require('body-parser');
// eslint-disable-next-line
const http = require('http');
// eslint-disable-next-line
const compression = require('compression');
// eslint-disable-next-line
const historyApiFallback = require('connect-history-api-fallback');

const app = express(); // 实例化express服务
app.use(bodyParser.json());
const { PORT = 3000 } = process.env; // 服务启动端口号
app.use(historyApiFallback());
// 如果是生产环境，则运行build文件夹中的代码
app.use(compression());
/* app.use(express.static('dist', {
    maxAge: '1d',
    setHeaders(res, file) {
        if (file.indexOf('index.html') > -1) {
            res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5');
        }
    },
})); */
app.use(express.static('dist'));

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
app.listen(PORT, 'localhost', () => {
    console.log(`本地服务启动地址: http://localhost:${PORT}`);
});
