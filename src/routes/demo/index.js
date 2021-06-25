import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import 'moment/locale/zh-cn';
import load from '~/common/load';
import UserWrap from '~/containers/UserWrap';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */), UserWrap);
const Rain = load(() => import('./pages/rain' /* webpackChunkName: rain */));
export const init = true;
export default () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.url}/rain`} component={Rain}/>
            <Route path={`${match.url}`} component={Demo}/>
        </Switch>
    );
};
