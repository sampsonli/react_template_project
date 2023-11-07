import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from 'antd';
import {
    Routes, Route,
} from 'react-router-dom';
import {useModel, evtBus} from 'mtor';
import load from '~/common/load';
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
    const navigate = useNavigate();
    const location = useLocation();
    const ignore = PcModel.ignoreSet.has(location.pathname);
    const {
        menuList,
        userInfo,
        loaded,
        isMobile,
    } = model;
    useEffect(() => {
        if (!loaded && !ignore) {
            model.init();
        }
    }, [ignore, loaded]);
    useEffect(() => evtBus.on('switchSize', (type) => {
        model.setData({isMobile: type});
    }), []);

    return (
        <ConfigProvider locale={zhCN}>
            {!ignore && loaded && (
                <BasicLayout isMobile={isMobile}
                    menuList={menuList}
                    doLogout={() => navigate('/pc/login')}
                    userInfo={userInfo}
                >
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="list" element={<List />} />
                        <Route path="chart" element={<Chart />} />
                    </Routes>
                </BasicLayout>
            )}
            {ignore && (
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="test" Component={Test} />
                </Routes>
            )}

        </ConfigProvider>

    );
};
