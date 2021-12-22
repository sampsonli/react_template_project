import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

import './assets/common.less';

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
