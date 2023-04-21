/**
 * 通过script标签加载资源
 * @param {string} src - 资源地址
 * @param attr - 加载后资源定义的全局变量
 * @returns {Promise<any>}
 */
export default (src, attr = '') => {
    if (!window.__loaded) {
        window.__loaded = {};
    }
    if (window.__loaded[src]) {
        return window.__loaded[src];
    }
    window.__loaded[src] = new Promise((resolve, reject) => {
        const element = document.createElement('script');
        document.body.appendChild(element);
        element.src = src;
        element.onload = () => {
            resolve(attr && window[attr]);
        };
        element.onerror = (e) => {
            reject(e);
        };
    });
    return window.__loaded[src];
};
