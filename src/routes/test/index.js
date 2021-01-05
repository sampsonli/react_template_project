import React from 'react';
import {
Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';
import load from '~/common/load';

const Home = load(() => import('./pages/home' /* webpackChunkName: home */));
const Test = load(() => import('./pages/test' /* webpackChunkName: test */));
const BadApple = load(() => import('./pages/badapple' /* webpackChunkName: badapple */));
export default () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.url}/home`} component={Home} />
            <Route path={`${match.url}/test`} component={Test} />
            <Route path={`${match.url}/badapple`} component={BadApple} />
            <Redirect to={`${match.url}/badapple`} />
        </Switch>
    );
};
