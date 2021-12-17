import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import {
    Routes, Route,
} from 'react-router-dom';
import { useModel } from '~/common/spring';
import load from '~/common/load';
import Redirect from '~/components/Redirect';
import PcModel from './models/PcModel';
import BasicLayout from './components/BasicLayout';
import './assets/style.less';
import {eventBus} from '~/common/EventBus';

const Login = load(() => import('./pages/Login'));
const Demo1 = load(() => import('./pages/Demo1'));
const Dashboard = load(() => import('./pages/Dashboard'));
export default () => {
    const model = useModel(PcModel);
    const location = useLocation();
    const ignore = PcModel.ignoreSet.has(location.pathname);
    const {
        menuList, userInfo, loaded, isMobile,
    } = model;
    useEffect(() => {
        if (!loaded && !ignore) {
            model.init();
        }
    }, [ignore, loaded]);
    useEffect(() => {
        const cb = (type) => {
            model.setData({ isMobile: type });
        };
        eventBus.on('switchSize', cb);
        return () => eventBus.off('switchSize', cb);
    }, []);

    return (
        <ConfigProvider locale={zhCN}>
            {!ignore && loaded && (
                <BasicLayout isMobile={isMobile} menuList={menuList} doLogout={model.doLogout} userInfo={userInfo}>
                    <Routes>
                        <Route path="home" element={<Dashboard />} />
                        <Route path="demo1" element={<Demo1 />} />
                        <Route path="" element={<Redirect to="home" />} />
                    </Routes>
                </BasicLayout>
            )}
            {ignore && (
                <Routes>
                    <Route path="login" element={<Login />} />
                </Routes>
            )}

        </ConfigProvider>

    );
};
