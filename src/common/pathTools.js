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

export const back = () => {
    window.history.back();
};

/**
 * 合并请求参数到hash
 * @param href -需要转换的url
 * @param defaultPath -hash 路由, 如果为空， 首先获取查询参数中的path 属性， 如果没有则为 '/'
 * @returns {string|*} -转换后端url
 */
 export const getMergedQSUrl = (href, defaultPath = '') => {
    const [url, hash] = href.split('#');
    if (url.indexOf('?') > -1) {
        const qs = url.split('?')[1];
        if (hash && hash.indexOf('?') > -1) {
            const tmp = hash.split('?');
            const queryObj = {...parseQueryStr(tmp[1]), ...parseQueryStr(qs)};
            const qString = Object.keys(queryObj)
                .map(key => `${key}=${queryObj[key]}`)
                .join('&');

            return `${url.split('?')[0]}#${tmp[0]}?${qString}`;
        } if (hash) {
            return `${url.split('?')[0]}#${hash}?${qs}`;
        }
        if (!defaultPath) {
            defaultPath = parseQueryStr(qs).path || '/';
        }
        return `${url.split('?')[0]}#${defaultPath}?${qs}`;
    }
    return href;
};
