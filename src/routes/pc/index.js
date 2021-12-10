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

const Login = load(() => import('./pages/Login'));
const Rain = load(() => import('./pages/rain'));
const Demo1 = load(() => import('./pages/Demo1'));
const Demo2 = load(() => import('./pages/Demo2'));
const Home = load(() => import('./pages/Home'));
export default () => {
    const model = useModel(PcModel);
    const location = useLocation();
    const ignore = PcModel.ignoreSet.has(location.pathname);
    const {
        menuList, userInfo, loaded,
    } = model;
    useEffect(() => {
        if (!loaded && !ignore) {
            model.init();
        }
    }, [ignore, loaded]);

    return (
        <>
            {!ignore && loaded && (
                <BasicLayout menuList={menuList} doLogout={model.doLogout} userInfo={userInfo}>
                        <Routes>
                            <Route path="home" element={<Home />} />
                            <Route path="demo1" element={<Demo1 />} />
                            <Route path="demo2" element={<Demo2 />} />
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
