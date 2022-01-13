/* eslint-disable react/function-component-definition */
import React from 'react';
import {
    Routes, Route, BrowserRouter, HashRouter,
} from 'react-router-dom';
import Redirect from '~/components/Redirect';

const routes = [];
((r) => {
    r.keys()
        .forEach((key) => {
            const module = r(key);
            const md = {
                Element: module.default,
                path: `/${key.split('/')[1]}`,
            };
            routes.push(md);
        });
})(require.context('./', true, /\.\/[^/]+\/index\.js$/));

export default () => (
    <HashRouter>
        <Routes>
            {routes.map(({
                path,
                Element,
            }) => <Route key={path} element={<Element />} path={`${path}/*`} />)}
            <Route path="*" element={<Redirect to="/pc/" />} />
        </Routes>
    </HashRouter>
);
