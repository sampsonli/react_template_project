import React from 'react';
import {
Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';
import load from '~/common/load';
import {resetQuery, useQueryParams} from '~/common/pathTools';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */));
const Rain = load(() => import('./pages/rain' /* webpackChunkName: rain */));
export const init = true;
export default () => {
    const match = useRouteMatch();
    const params = useQueryParams();
    if (params.type === 'login' && params.code) {
        resetQuery();
        return '';
    }
    return (
        <Switch>
            <Route path={`${match.url}/rain`} component={Rain} />
            <Route path={`${match.url}/home`} component={Demo} />
            <Redirect from={`${match.url}`} to={`${match.url}/home`} />
        </Switch>
    );
};
