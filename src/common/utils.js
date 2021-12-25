import {useEffect} from 'react';
import {useModel} from 'mtor';

export const wait = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});
export const debounce = (fn, delay = 100) => {
    let timer = null; // 借助闭包
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay); // 简化写法
    };
};
const tempObj = {};

/**
 * 页面初始化以及销毁方法绑定， 热更新时，不会重复执行初始化和销毁方法， 对开发环境特别友好
 * 等同于<br/>
 * useEffect(() => {
 *     initFn();
 *     return clearFn
 * }, []);
 * @param initFn - 初始化方法
 * @param clearFn - 页面销毁的时候执行回调
 * @param flag - 标志位， 一般 module.id
 */
export const useInitPage = (initFn, clearFn, flag) => {
    useEffect(() => {
        if (tempObj[flag]) {
            clearTimeout(tempObj[flag]);
        } else {
            initFn();
        }
        return () => {
            tempObj[flag] = setTimeout(() => {
                clearFn();
                delete tempObj[flag];
            }, 20);
        };
    }, []);
};
