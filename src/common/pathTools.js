import {useMemo} from 'react';

const resolvePath = (path) => {
    path = path.replace(/\/\.\//g, '/')
        .replace(/^\.\//, '');
    const tmp = path.split('/');
    const stack = [];
    tmp.forEach((item) => {
        if (item === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(item);
        }
    });
    return stack.join('/');
};

/**
 * 获取所有请求参数key-value 对象
 * @param qs
 * @return {{}}
 */
export const parseQueryStr = (qs) => {
    if (qs && qs.indexOf('?') > -1) {
        [, qs] = qs.split('?');
    }
    const result = {};
    if (qs) {
        qs.split('&')
            .forEach(ele => {
                const tmp = ele.split('=');
                // eslint-disable-next-line prefer-destructuring
                result[tmp[0]] = decodeURIComponent(tmp[1]);
            });
    }
    return result;
};
/**
 * hooks获取所有请求参数key-value 对象
 * @return {{}}
 */
export const useQueryParams = () => useMemo(
    () => parseQueryStr(window.location.hash ? window.location.hash.split('?')[1] : window.location.href.split('?')[1]),
    [window.location.href],
);

const getFinalPath = (path, query = {}) => {
    const queryStr = Object.keys(query)
        .map(key => `${key}=${query[key]}`)
        .join('&');
    if (queryStr) {
        if (path.indexOf('/') === 0) {
            return `${resolvePath(`#${path}`)}?${queryStr}`;
        }
        const fPath = window.location.hash.substr(0, window.location.hash.lastIndexOf('/') + 1) + path;
        return `${resolvePath(fPath)}?${queryStr}`;
    }
    if (path.indexOf('/') === 0) {
        return resolvePath(`#${path}`);
    }
    const fPath = window.location.hash.substr(0, window.location.hash.lastIndexOf('/') + 1) + path;
    return resolvePath(fPath);
};

/**
 * 重置查询参数
 */
export const resetQuery = () => {
    if (window.location.hash) {
        const [path] = window.location.hash.split('?');
        window.location.replace(path);
    } else {
        const [path] = window.location.href.split('?');
        window.location.replace(path);
    }
};

/**
 * 跳转新的页面
 * @param path {string}
 * @param query {Object}
 */
export const pushPath = (path, query = {}) => {
    window.location.href = getFinalPath(path, query);
};
/**
 * 替换当前页面
 * @param path {string}
 * @param query {Object}
 */
export const replacePath = (path, query = {}) => {
    window.location.replace(getFinalPath(path, query));
};
/**
 * 开启新的Tab页面
 * @param path {string}
 * @param query {Object}
 */
export const openNewTab = (path, query = {}) => {
    window.open(getFinalPath(path, query), '_blank');
};
/**
 * 刷新跳转新页面
 * @param path {string}
 * @param query {Object}
 */
export const reloadPushPath = (path, query = {}) => {
    // const tmp = getFinalPath(path, query).split('#');
    // window.open([`${tmp[0].split('?')[0]}?_t=${Date.now()}`, tmp[1]].join('#'), '_self');
    window.location.href = getFinalPath(path, query);
    window.location.reload();
    // const url = `jump.html?type=reload&url=/${encodeURIComponent(getFinalPath(path, query))}`;
    // window.location.href = url;
};
/**
 * 刷新替换当前页面
 * @param path {string}
 * @param query {Object}
 */
export const reloadReplacePath = (path, query = {}) => {
    // const tmp = getFinalPath(path, query).split('#');
    // window.location.replace([`${tmp[0].split('?')[0]}?_t=${Date.now()}`, tmp[1]].join('#'), '_self');
    window.location.replace(getFinalPath(path, query));
    window.location.reload();
    // const url = `jump.html?type=reload&url=/${encodeURIComponent(getFinalPath(path, query))}`;
    // window.location.replace(url);
};
export const back = () => {
    window.history.back();
};
