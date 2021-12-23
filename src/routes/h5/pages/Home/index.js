import React, { useEffect } from 'react';
import { useModel } from 'mtor';
import { Badge, TabBar, NavBar } from 'antd-mobile';
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons';
import HomeModel from '~/routes/h5/models/HomeModel';
import style from './style.less';

const Home = () => {
    const model = useModel(HomeModel);
    useEffect(() => {
        model.init();
    }, []);
    const { name, activeKey } = model;
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            key: 'todo',
            title: '我的待办',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: 'message',
            title: '我的消息',
            // eslint-disable-next-line react/no-unstable-nested-components
            icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
            badge: '99+',
        },
        {
            key: 'personalCenter',
            title: '个人中心',
            icon: <UserOutline />,
        },
    ];
    return (
        <div className={style.homePage}>
            <div className={style.top}>
                <NavBar>配合路由使用</NavBar>
            </div>
            <div className={style.content}>
                {name}
                <br />
                {activeKey}
            </div>
            <TabBar activeKey={activeKey} onChange={(key) => model.setData({activeKey: key})} className={style.tabbar}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    );
};
export default Home;
