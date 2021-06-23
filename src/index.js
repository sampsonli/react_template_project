import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from './store';
import Router from './router';
import './assets/common.less';

const render = () => {
    ReactDOM.render(
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <Router />
            </Provider>
        </ConfigProvider>,
        document.getElementById('app'),
    );
};
render();
export default render;
