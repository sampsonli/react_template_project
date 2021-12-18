import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import './assets/common.less';
import EventBus from './common/EventBus';

window.eventBus = EventBus.instance;

const render = () => {
    ReactDOM.render(
        <Routes />,
        document.getElementById('app'),
    );
};
render();
export default render;
if (module.hot) {
    module.hot.accept();
}
