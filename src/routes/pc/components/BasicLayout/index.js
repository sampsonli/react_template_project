/* eslint-disable react/prop-types */
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    HomeOutlined,
    WechatOutlined,
    QqOutlined,
} from '@ant-design/icons';
import React, {
    useCallback, useEffect, useState, useMemo,
} from 'react';
import {
    Menu, Button, Breadcrumb, Layout, Divider, Drawer,
} from 'antd';
import {useLocation} from 'react-router';
import style from './style.less';
import {pushPath} from '~/common/pathTools';
import Logo from './Logo';

const {
    Sider,
    Header,
    Content
} = Layout;

const key2Icon = {
    '/pc/home': <HomeOutlined/>,
    '/pc/demo1': <WechatOutlined/>,
    '/pc/demo2': <QqOutlined/>,
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
    const findEle = (menus, path) => {
        for (let i = 0; i < menus.length; i++) {
            path.push(menus[i].title);
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
 * @param mList {[MenuItem]}
 */
const genSubMenu = (mList) => mList.map((item) => {
    if (item.children && item.children.length > 0) {
        return (
            <SubMenu
                key={item.key}
                title={item.title}
                icon={key2Icon[item.key]}
            >
                {genSubMenu(item.children)}
            </SubMenu>
        );
    }

    return (
        <Menu.Item className={style.subMenu} key={item.key} icon={key2Icon[item.key]}>
            {item.title}
        </Menu.Item>
    );
});

export const BasicLayoutContext = React.createContext({
    setKey: () => null,
    setTitles: () => null,
});

const {SubMenu} = Menu;
/**
 *
 *
 * @param menuList {[MenuItem]}
 * @param children {JSX.Element}
 * @param userInfo {{userName}}
 * @param doLogout {function}
 * @returns {JSX.Element}
 * @constructor
 */
const BasicLayout = ({
                         menuList,
                         children,
                         userInfo = {},
                         doLogout = () => null,
                     }) => {
    const location = useLocation();
    const [key, setKey] = useState(location.pathname);
    const [titles, setTitles] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        const titleList = findMenuPath(menuList, location.pathname);
        if (key === location.pathname && titles.length) {
            return;
        }
        setKey(location.pathname);
        setTitles(titleList);
    }, [location.pathname]);
    const onChangeKey = useCallback((e) => {
        pushPath(e.key);
    }, []);
    const provide = useMemo(() => ({
        setKey,
        setTitles,
    }), []);
    const isMobile = true;
    return (
        <Layout className={style.basicLayout}>

            {!isMobile ? (
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    width="2.4rem"
                >
                    <Logo/>
                    <Menu
                        theme="dark"
                        onClick={onChangeKey}
                        defaultSelectedKeys={[key]}
                        selectedKeys={[key]}
                        mode="inline"
                        defaultOpenKeys={['1', '2', '3', '4', '5']}
                        inlineCollapsed={collapsed}
                    >
                        {genSubMenu(menuList)}
                    </Menu>

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
                            inlineCollapsed={false}
                        >
                            {genSubMenu(menuList)}
                        </Menu>

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
                                <MenuFoldOutlined/>
                            ) : (
                                <MenuUnfoldOutlined/>
                            )}
                        />
                        <Breadcrumb>
                            {titles.map((tit) => (
                                <Breadcrumb.Item key={tit}>{tit}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    </div>
                    <div className={style.user}>
                        <span className={style.info}>{userInfo.name}</span>
                        <Divider type="vertical"/>
                        <Button onClick={doLogout} type="link" icon={<LogoutOutlined/>} title="退出登录"/>
                    </div>
                </Header>
                <Content className={style.content}><BasicLayoutContext.Provider
                    value={provide}>{children}</BasicLayoutContext.Provider></Content>
            </Layout>
        </Layout>
    );
};
export default BasicLayout;
