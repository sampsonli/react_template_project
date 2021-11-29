import React from 'react';
import {
    Routes, Route,
} from 'react-router-dom';
import load from '~/common/load';
import Redirect from '~/components/Redirect';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */));
const Rain = load(() => import('./pages/rain' /* webpackChunkName: rain */));
export default () => (
        <Routes>
            <Route path="rain" element={<Rain />} />
            <Route path="home" element={<Demo />} />
            <Route path="*" element={<Redirect to="home" />} />
        </Routes>
    );
