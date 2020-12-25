import React from 'react';
import {
    HashRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

const routes = [];
((r) => {
    r.keys().forEach((key) => {
        const md = {component: r(key).default, path: `/${key.split('/')[2]}`};
        routes.push(md);
    });
})(require.context('./', true, /\.\/routes\/[^/]+\/index\.js$/));
// require.context('./', true, /^\.\/(common|components).*\.js$/);

export default () => (
    <Router>
        <Switch>
            { routes.map(r => <Route key={r.path} component={r.component} path={r.path} />)}
            <Redirect from="/" to="/test/badapple" />
        </Switch>
    </Router>
);
