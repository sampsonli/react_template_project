import react, {useMemo} from 'react';

// import react from 'react';
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
export const parseQueryStr = (qs) => {
    if (qs && qs.indexOf('?') === 0) {
        qs = qs.replace('?', '');
    }
    qs = qs || decodeURIComponent(window.location.hash.split('?')[1]);
    const result = {};
    if (qs) {
        qs.split('&')
            .forEach(ele => {
                const tmp = ele.split('=');
                // eslint-disable-next-line prefer-destructuring
                result[tmp[0]] = tmp[1];
            });
    }
    return result;
};
export const useQueryParams = () => useMemo(parseQueryStr, [window.location.href]);

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

export const pushPath = (path, query = {}) => {
    window.location.href = getFinalPath(path, query);
};
export const replacePath = (path, query = {}) => {
    window.location.replace(getFinalPath(path, query));
};
export const back = () => {
    window.history.back();
};
