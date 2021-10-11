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
               哈哈哈哈， 我不骂你了。
               hello 我又回来了

            </div>
        </div>

    );
};
