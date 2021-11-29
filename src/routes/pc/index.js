import React, {useEffect} from 'react';
import {
    Routes, Route,
} from 'react-router-dom';
import { useModel } from 'redux-spring';
import load from '~/common/load';
import BasicLayout from '~/components/BasicLayout';
import Redirect from '~/components/Redirect';
import UserModel from '~/models/UserModel';

const Demo = load(() => import('./pages/demo' /* webpackChunkName: demo */));
const Rain = load(() => import('./pages/rain' /* webpackChunkName: rain */));
export default () => {
    const model = useModel(UserModel);
    const {menus, userInfo, loaded} = model;
    useEffect(() => {
        model.init();
    }, []);
    if (!loaded) return '';
    return (
        <BasicLayout menuList={menus} userInfo={userInfo}>
           <Routes>
            <Route path="rain" element={<Rain />} />
            <Route path="home" element={<Demo />} />
            <Route path="*" element={<Redirect to="home" />} />
           </Routes>
        </BasicLayout>

);
};
