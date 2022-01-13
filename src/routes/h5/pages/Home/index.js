import React from 'react';
import {useInitModel} from 'mtor';
import {
 Badge, TabBar, NavBar, Button,
} from 'antd-mobile';
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons';
import { useNavigate } from 'react-router';
import HomeModel from '~/routes/h5/models/HomeModel';
import style from './style.less';

const Home = () => {
    const model = useInitModel(HomeModel);
    const { active } = model;
    const navigate = useNavigate();
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
            icon: (act) => (act ? <MessageFill /> : <MessageOutline />),
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
                <NavBar>{active.title}</NavBar>
            </div>
            <div className={style.content}>
                跳转：
                <Button color="primary" onClick={() => navigate('../demo')}>demo 测试页</Button>
            </div>
            <TabBar activeKey={active.key} onChange={(key) => model.setData({active: {key, title: tabs.find(item => item.key === key).title}})} className={style.tabbar}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    );
};
export default Home;
