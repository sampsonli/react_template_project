/** 用于开发环境的服务启动 * */
const path = require('path'); // 获取绝对路径有用
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
const forward = require('forward-request');
// eslint-disable-next-line
const http = require('http');
// eslint-disable-next-line
const compression = require('compression');

const webpackConfig = require('./build/webpack.config.dev.js'); // webpack开发环境的配置文件

const app = express(); // 实例化express服务
const DIST_DIR = webpackConfig.output.path; // webpack配置中设置的文件输出路径，所有文件存放在内存中
const {PORT = 3000} = process.env; // 服务启动端口号

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
    app.get('/', (req, res, next) => {
        const filename = path.join(DIST_DIR, 'index.html');

        // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
}
/*
// 接口转发
const forwardCfg = {
    ewt360: [
        ['/api', {host: 'teacher.ewt360.com', isPre: false}],
        ['/login', 'www.ewt360.com'], // 页面跳转
        ['/externalapi', 'study.ewt360.com'],
        ['/PCCourseListService', 'teacher.ewt360.com'],
        ['/ewtbend/report/', 'teacher.ewt360.com'], // 页面跳转
        ['/Teacher/', 'teacher.ewt360.com'], // 页面跳转
        ['/student/', 'teacher.ewt360.com'], // 页面跳转
        ['/member/', 'www.ewt360.com'], // 页面跳转
        ['/manageapi/', {host: 'teacher.ewt360.com', isHttps: true, isPre: false}], // oatasklist
    ],
    mistong: [
        ['/api', 'teacher.test.mistong.com'],
        ['/login', 'www.test.mistong.com'], // 页面跳转
        ['/externalapi', 'study.test.mistong.com'],
        ['/PCCourseListService', 'teacher.test.mistong.com'],
        ['/ewtbend/report/', 'teacher.test.mistong.com'], // 页面跳转
        ['/Teacher/', 'teacher.test.mistong.com'], // 页面跳转
        ['/student/', 'teacher.test.mistong.com'], // 页面跳转
        ['/member/', 'www.test.mistong.com'], // 页面跳转
        ['/manageapi/', {host: 'teacher.ewt360.com', isHttps: true, isPre: false}], // oatasklist
    ],
};
app.use((req, resp, next) => {
    const isOnline = req.hostname.indexOf('ewt360.com') > -1;
    let cfg = null;
    forwardCfg[isOnline ? 'ewt360' : 'mistong'].some((item) => {
        const [uri, config] = item;
        if (req.originalUrl.toLowerCase().indexOf(uri.toLowerCase()) > -1) {
            cfg = config;
            return true;
        }
        return false;
    });
    if (cfg) {
        let host = cfg;
        let ip = cfg;
        let isHttps = true;
        let isPre = true;
        if (typeof cfg !== 'string') {
            host = cfg.host;
            ip = cfg.ip || host;
            isHttps = cfg.isHttps !== undefined ? cfg.isHttps : true;
            isPre = cfg.isPre === undefined ? true : !!cfg.isPre;
        }
        if (isOnline && isPre) {
            ip = '121.52.240.85'; // 预发
        }
        forward({
            req,
            resp,
            isHttps,
            host,
            ip,
            path: req.originalUrl,
            showLog: false,
        });
    } else {
        next();
    }
}); */

/** 启动服务 * */
app.listen(PORT, '0.0.0.0', () => {
    console.log(`本地服务启动地址: http://localhost:${PORT}`);
});
