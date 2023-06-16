/* eslint-disable react/function-component-definition */
import React from 'react';
import {
    createBrowserRouter, RouterProvider, createHashRouter,
} from 'react-router-dom';
import Redirect from '~/components/Redirect';

const routes = [];
((r) => {
    r.keys()
        .forEach((key) => {
            const module = r(key);
            const md = {
                Element: module.default,
                path: `/${key.split('/')[1]}/*`,
            };
            routes.push(md);
        });
})(require.context('./', true, /\.\/[^/]+\/index\.js$/));

const router = createHashRouter(
    [...routes.map(({
        path,
        Element,
    }) => ({
            path,
            element: <Element />,
        })), {
        path: '/*',
        element: <Redirect to="/pc" />,
    }],
);

export default () => (
    <RouterProvider router={router} />
);
