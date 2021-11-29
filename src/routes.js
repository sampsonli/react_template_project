import React, { Component } from 'react';
import {
    HashRouter as Router, Routes as Switch, Route,
} from 'react-router-dom';

const routes = [];
((r) => {
    r.keys().forEach((key) => {
        const module = r(key);
        const md = { Element: module.default, path: `/${key.split('/')[2]}` };
        routes.push(md);
    });
})(require.context('./', true, /\.\/routes\/[^/]+\/index\.js$/));

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
                    {routes.map(({path, Element}) => <Route key={path} element={<Element />} path={`${path}/*`} />)}
                </Switch>
            </Router>
        );
    }
}
