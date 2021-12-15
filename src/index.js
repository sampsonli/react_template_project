import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './routes';

import './assets/common.less';
import EventBus from './common/EventBus';

window.eventBus = EventBus.instance;

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Routes />
        </Provider>,
        document.getElementById('app'),
    );
};
render();
export default render;
if (module.hot) {
    module.hot.accept();
}
