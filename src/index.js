import 'core-js/modules/es.set';
import 'core-js/modules/es.map';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.promise';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import loadJs from '~/common/loadjs';
import store from './store';
import Router from './router';
import './assets/common.css';

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router />
        </Provider>,
        document.getElementById('app'),
    );
};
if (window.location.href.indexOf('debug=1') > -1) {
    loadJs('lib/vconsole.min.js', 'VConsole').then(VConsole => {
        window._vc = new VConsole();
        render();
    });
} else {
    render();
}
export default render;
