import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import load from '~/common/load';
import UserWrap from '~/containers/UserWrap';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */), UserWrap);
export const init = true;
export default () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.url}`} component={Demo} />
        </Switch>
    );
};
