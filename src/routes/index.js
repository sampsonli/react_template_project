/* eslint-disable react/function-component-definition */
import React from 'react';
import {
    createBrowserRouter, RouterProvider,
} from 'react-router-dom';

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

const router = createBrowserRouter(
    routes.map(({
        path,
        Element,
    }) => ({
            path,
            element: <Element />,
        })),
);

export default () => (
    <RouterProvider router={router} />
);
