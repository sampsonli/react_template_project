import React, { Component } from 'react';
import {
    HashRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';

const routes = [];
let init = ''; // 初始化加载模块
((r) => {
    r.keys().forEach((key) => {
        const module = r(key);
        const md = { component: module.default, path: `/${key.split('/')[2]}` };
        if (!init && module.init) {
            init = `/${key.split('/')[2]}`;
        }
        routes.push(md);
    });
})(require.context('./', true, /\.\/routes\/[^/]+\/index\.js$/));
// require.context('./', true, /^\.\/(common|components).*\.js$/);
init = init || routes[0].path;
export default class Routes extends Component {
    componentDidCatch(e) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(e.message);
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    {routes.map(r => <Route key={r.path} component={r.component} path={r.path} />)}
                    <Redirect from="/" to={init} />
                </Switch>
            </Router>
        );
    }
}
