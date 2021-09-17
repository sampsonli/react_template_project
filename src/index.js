import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import store from './store';
import Routes from './routes';

if (process.env.NODE_ENV !== 'development') {
    require('./assets/common.less');
}

const render = () => {
    ReactDOM.render(
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <Routes />
            </Provider>
        </ConfigProvider>,
        document.getElementById('app'),
    );
};
render();
export default render;
if (module.hot) {
    module.hot.accept();
}
