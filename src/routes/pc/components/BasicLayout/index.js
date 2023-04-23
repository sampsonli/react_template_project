/* eslint-disable react/prop-types */
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    HomeOutlined,
    WechatOutlined,
    QqOutlined,
    AlipayCircleOutlined,
} from '@ant-design/icons';
import React, {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import {
    Menu, Button, Breadcrumb, Layout, Divider, Drawer,
} from 'antd';
import {useHref, useLocation, useNavigate} from 'react-router';
import { evtBus } from 'mtor';
import style from './style.less';
import Logo from './Logo';

const {
    Sider,
    Header,
    Content,
} = Layout;

const key2Icon = {
    '/pc': <HomeOutlined />,
    '/pc/list': <WechatOutlined />,
    '/pc/chart': <QqOutlined />,
    '/pc/test': <AlipayCircleOutlined />,
};
/**
 * @typedef MenuItem {{title, key, children?: [MenuItem]}}
 */

/**
 *
 * @param list {[MenuItem]}
 * @param key {string}
 */
const findMenuPath = (list, key) => {
    /**
     *
     * @param menus {[MenuItem]}
     * @param path {[]}
     */
    // eslint-disable-next-line consistent-return
    const findEle = (menus, path) => {
        for (let i = 0; i < menus.length; i++) {
            path.push(menus[i].label);
            if (menus[i].key === key) {
                return true;
            }
            if (menus[i].children && menus[i].children.length) {
                const tmp = findEle(menus[i].children, path);
                if (tmp) {
                    return true;
                }
            }
            path.pop();
        }
    };
    const path = [];
    findEle(list, path);
    return path;
};

/**
 *
 *
 * @param menuList {[MenuItem]}
 * @param children {JSX.Element}
 * @param userInfo {{name}}
 * @param doLogout {function}
 * @param isMobile {boolean}
 * @returns {JSX.Element}
 * @constructor
 */
const BasicLayout = ({
    menuList,
    children,
    userInfo = {},
    doLogout = () => null,
    isMobile = false,
}) => {
    const menus = useMemo(() => menuList.map(m => ({...m, icon: key2Icon[m.key]})), [menuList]);
    const location = useLocation();
    const navigate = useNavigate();
    const [key, setKey] = useState(location.pathname);
    const [titles, setTitles] = useState([]);
    // const [collapsed, setCollapsed] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    useEffect(() => {
        const titleList = findMenuPath(menuList, location.pathname);
        if (key === location.pathname && titles.length) {
            return;
        }
        setKey(location.pathname);
        setTitles(titleList);
    }, [location.pathname]);
    useEffect(() => {
        const cb = ({ selected, paths } = {}) => {
            paths && setTitles(paths);
            selected && setKey(selected);
        };
        evtBus.on('setMenuInfo', cb);
        return () => evtBus.off('setMenuInfo', cb);
    }, []);
    const onChangeKey = useCallback((e) => {
        navigate(e.key);
        if (isMobile) {
            setCollapsed(false);
        }
    }, [isMobile]);
    return (
        <Layout className={style.basicLayout}>

            {!isMobile ? (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width="2.4rem"
                >
                    <Logo />
                    <Menu
                        theme="dark"
                        onClick={onChangeKey}
                        defaultSelectedKeys={[key]}
                        selectedKeys={[key]}
                        mode="inline"
                        defaultOpenKeys={['1', '2', '3', '4', '5']}
                        items={menus}
                    />

                </Sider>
            ) : (
                <Drawer
                    className={style.drawerComp}
                    visible={collapsed}
                    placement="left"
                    width={200}
                    closable={false}
                    maskClosable
                    onClose={() => setCollapsed(!collapsed)}
                >
                    <Sider
                        collapsible
                        collapsed={false}
                        onCollapse={setCollapsed}
                        // width="2.4rem"
                        trigger={null}
                    >
                        <Logo />
                        <Menu
                            theme="dark"
                            onClick={onChangeKey}
                            defaultSelectedKeys={[key]}
                            selectedKeys={[key]}
                            mode="inline"
                            defaultOpenKeys={['1', '2', '3', '4', '5']}
                            items={menus}
                        />

                    </Sider>
                </Drawer>
            )}
            <Layout className={style.right}>
                <Header className={style.top}>
                    <div className={style.tLeft}>
                        <Button
                            className={style.btn}
                            type="link"
                            onClick={() => setCollapsed(!collapsed)}
                            icon={collapsed ? (
                                <MenuFoldOutlined />
                            ) : (
                                <MenuUnfoldOutlined />
                            )}
                        />
                        <Breadcrumb items={titles.map(title => ({title}))} />
                    </div>
                    <div className={style.user}>
                        <span className={style.info}>{userInfo.name}</span>
                        <Divider type="vertical" />
                        <Button onClick={doLogout} type="link" icon={<LogoutOutlined />} title="退出登录" />
                    </div>
                </Header>
                <Content className={style.content}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default BasicLayout;
