import React, {useEffect} from 'react';
import { useLocation } from 'react-router';
import {
    Routes, Route,
} from 'react-router-dom';
import { useModel } from 'redux-spring';
import load from '~/common/load';
import Redirect from '~/components/Redirect';
import PcModel from './models/PcModel';
import BasicLayout from './components/BasicLayout';

const Login = load(() => import('./pages/Login' /* webpackChunkName: login */));
const Home = load(() => import('./pages/Home' /* webpackChunkName: home */));
const Rain = load(() => import('./pages/rain' /* webpackChunkName: rain */));
export default () => {
    const model = useModel(PcModel);
    const location = useLocation();
    const ignore = PcModel.ignoreSet.has(location.pathname);
    const {
        menuList, userInfo, loaded,
    } = model;
    useEffect(() => {
        if (!model.userInfo && !ignore) {
            model.init();
        }
    }, [ignore]);

    return (
        <>
            {!ignore && loaded && (
                <BasicLayout menuList={menuList} userInfo={userInfo}>
                        <Routes>
                            <Route path="home" element={<Home />} />
                            <Route path="" element={<Redirect to="home" />} />
                        </Routes>
                </BasicLayout>
            )}
            {ignore && (
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="rain" element={<Rain />} />
                    </Routes>
            )}

        </>

);
};
