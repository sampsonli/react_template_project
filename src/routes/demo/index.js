import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import load from '~/common/load';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */));
export const init = true;
export default () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.url}`} component={Demo} />
        </Switch>
    );
};
