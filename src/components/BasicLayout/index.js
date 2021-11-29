/* eslint-disable react/prop-types */
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Menu, Button, Breadcrumb } from 'antd';
import style from './style.less';
import { pushPath } from '~/common/pathTools';

const key2Icon = {
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

const { SubMenu } = Menu;
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
export const BasicLayout = ({
 menuList, children, userInfo = {}, doLogout = () => null,
}) => {
    const [key, setKey] = useState('');
    const [titles, setTitles] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        const hashChangeHandler = () => {
            const path = window.location.hash.replace('#', '').split('?')[0];
            const titleList = findMenuPath(menuList, path);
            if (key === path) {
                return;
            }
            setKey(path);
            setTitles(titleList);
        };
        hashChangeHandler();
        window.addEventListener('hashchange', hashChangeHandler);
        return () => window.removeEventListener('hashchange', hashChangeHandler);
    }, []);
    const provide = useMemo(() => ({setKey, setTitles}), []);
    const onChangeKey = useCallback((e) => {
        pushPath(e.key);
    }, []);
    return (
        <div className={style.basicLayout}>
            <div className={style.left} style={{ width: collapsed ? '.8rem' : '2.3rem' }}>
                <div className={style.logo}>
                    <i className={style.ico} />
                    {!collapsed && <div className={style.title}>通用管理平台</div>}
                </div>
                <Menu
                    theme="dark"
                    className={`${style.menu}`}
                    onClick={onChangeKey}
                    defaultSelectedKeys={[key]}
                    selectedKeys={[key]}
                    mode="inline"
                    defaultOpenKeys={['1', '2', '3', '4', '5']}
                    inlineCollapsed={collapsed}
                >
                    {genSubMenu(menuList)}
                </Menu>
            </div>
            <div className={style.right}>
                <div className={style.top}>
                    <div className={style.tLeft}>
                        <Button
                            className={style.btn}
                            type="link"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? (
                                <MenuFoldOutlined style={{ fontSize: '0.18rem' }} />
                            ) : (
                                <MenuUnfoldOutlined style={{ fontSize: '0.18rem' }} />
                            )}
                        </Button>
                        <Breadcrumb>
                            {titles.map((tit) => (
                                <Breadcrumb.Item key={tit}>{tit}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    </div>
                    <div className={style.user}>
                        <div className={style.info}>{userInfo.name}</div>
                        <div className={style.logout} title="退出登录" onClick={doLogout} />
                    </div>
                </div>
                <div className={style.content}><BasicLayoutContext.Provider value={provide}>{children}</BasicLayoutContext.Provider></div>
            </div>
        </div>
    );
};
export default BasicLayout;
