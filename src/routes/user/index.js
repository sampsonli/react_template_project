import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import 'moment/locale/zh-cn';
import load from '~/common/load';

const Login = load(() => import('./pages/Login' /* webpackChunkName: demo */));
export default () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.url}/login`} component={Login} />
        </Switch>
    );
};
