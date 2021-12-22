import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
    Routes, Route,
} from 'react-router-dom';
import { useModel, evtBus } from 'mtor';
import load from '~/common/load';
import Redirect from '~/components/Redirect';
import H5Model from './models/H5Model';
import './assets/style.less';

const Home = load(() => import('./pages/Home'));

window.eventBus = evtBus;
export default () => {
    const model = useModel(H5Model);
    const location = useLocation();
    const ignore = H5Model.ignoreSet.has(location.pathname);
    const {
        loaded,
    } = model;
    useEffect(() => {
        if (!loaded && !ignore) {
            model.init();
        }
    }, [ignore, loaded]);

    return (
        <>
            {!ignore && loaded && (
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="" element={<Redirect to="home" />} />
                </Routes>
            )}
            {ignore && (
                <Routes>
                    <Route path="login" element={<Home />} />
                </Routes>
            )}

        </>

    );
};
