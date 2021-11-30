import React, {useEffect} from 'react';
import { useLocation } from 'react-router';
import {
    Routes, Route,
} from 'react-router-dom';
import { useModel } from 'redux-spring';
import load from '~/common/load';
import BasicLayout from '~/components/BasicLayout';
import Redirect from '~/components/Redirect';
import PcModel from './models/PcModel';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */));
const Rain = load(() => import('./pages/rain' /* webpackChunkName: rain */));
const ignoreSet = new Set(['/pc/login']);
export default () => {
    const model = useModel(PcModel);
    const location = useLocation();
    const ignore = ignoreSet.has(location.pathname);
    const {
        menuList, userInfo, loaded,
    } = model;
    useEffect(() => {
        if (!model.userInfo && !ignore) {
            model.getUserInfo();
        }
    }, [ignore]);

    return (
        <>
            {!ignore && loaded && (
                <BasicLayout menuList={menuList} userInfo={userInfo}>
                        <Routes>
                            <Route path="rain" element={<Rain />} />
                            <Route path="home" element={<Demo />} />
                            <Route path="*" element={<Redirect to="home" />} />
                        </Routes>
                </BasicLayout>
            )}
            {ignore && (
                    <Routes>
                        <Route path="login" element={<Demo />} />
                    </Routes>
            )}

        </>

);
};
