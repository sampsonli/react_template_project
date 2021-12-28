import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import {
    Routes, Route,
} from 'react-router-dom';
import { useModel, evtBus } from 'mtor';
import load from '~/common/load';
import Redirect from '~/components/Redirect';
import PcModel from './models/PcModel';
import BasicLayout from './components/BasicLayout';
import './assets/style.less';

const Login = load(() => import('./pages/Login'));
const List = load(() => import('./pages/List'));
const Chart = load(() => import('./pages/Chart'));
const Test = load(() => import('./pages/Test'));
const Dashboard = load(() => import('./pages/Dashboard'));

window.eventBus = evtBus;
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
        evtBus.on('switchSize', cb);
        return () => evtBus.off('switchSize', cb);
    }, []);

    return (
        <ConfigProvider locale={zhCN}>
            {!ignore && loaded && (
                <BasicLayout isMobile={isMobile} menuList={menuList} doLogout={model.doLogout} userInfo={userInfo}>
                    <Routes>
                        <Route path="home" element={<Dashboard />} />
                        <Route path="list" element={<List />} />
                        <Route path="chart" element={<Chart />} />
                        <Route path="test" element={<Test />} />
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
