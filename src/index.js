import 'core-js';
import React from 'react';
import Routes from './routes';
import './assets/common.less';
import root from './root';

root.render(<Routes />);

if (module.hot) {
    module.hot.accept();
}
