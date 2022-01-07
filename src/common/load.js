import React, {useEffect, useState} from 'react';

/**
 * 动态加载组件
 * @template T
 * @param {function(): Promise<{default: T, onUpdate?: function({default: T})}>} loadComp - 组件加载方法
 * @param {React.Component|function(...arg)} [LoadingComp] - 加载中渲染组件
 * @return {T}
 */
export default (loadComp, LoadingComp = () => null) => (props) => {
        const [comp, setComp] = useState({Component: null, hot: false});
        useEffect(() => {
            loadComp().then((cp) => {
                comp.onUpdate = (args) => {
                    setComp({
                        Component: args.default,
                        hot: true,
                    });
                };
                setComp({
                    Component: cp.default,
                    hot: false,
                });
            });
        }, []);
        return comp.Component ? <comp.Component {...props} /> : <LoadingComp {...props} />;
    };
