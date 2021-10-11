import React, {useEffect} from 'react';
import {useModel} from 'redux-spring';
import style from './style.less';
import DemoModel from '~/routes/demo/models/DemoModel';


export default () => {
    const model = useModel(DemoModel);
    useEffect(() => {
        model.init();
    }, []);
    const {
        num,
        loaded,
    } = model;
    return (
        <div className={style.container}>
            <div className={style.content}>
               阿敏 是个大傻逼， 怎么样
               看到了吗，<br/>
               不需要你刷新页面 ，我想发消息给你， 你就可以看到了

            </div>
        </div>

    );
};
