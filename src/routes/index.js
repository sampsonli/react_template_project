/* eslint-disable react/function-component-definition */
import React, { Component } from 'react';
import {
    HashRouter, Routes as Switch, Route,
} from 'react-router-dom';
import Redirect from '~/components/Redirect';

const routes = [];
((r) => {
    r.keys().forEach((key) => {
        const module = r(key);
        const md = { Element: module.default, path: `/${key.split('/')[1]}` };
        routes.push(md);
    });
})(require.context('./', true, /\.\/[^/]+\/index\.js$/));

export default class Routes extends Component {
    componentDidCatch(e) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(e.message);
        }
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    {routes.map(({path, Element}) => <Route key={path} element={<Element />} path={`${path}/*`} />)}
                    <Route path="*" element={<Redirect to={`${routes[0].path }/`} />} />
                </Switch>
            </HashRouter>
        );
    }
}
