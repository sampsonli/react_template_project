import React from 'react';
import {
    Routes, Route,
} from 'react-router-dom';
import load from '~/common/load';
import { useQueryParams } from '~/common/pathTools';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */));
const Rain = load(() => import('./pages/rain' /* webpackChunkName: rain */));
export default function () {
    const params = useQueryParams();
    return (
        <Routes>
            <Route path="rain" element={<Rain />} />
            <Route path="home" element={<Demo />} />
        </Routes>
    );
}
