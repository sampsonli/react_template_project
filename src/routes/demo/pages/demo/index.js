import React, { useEffect } from 'react';
import { useModel } from 'redux-spring';
import style from './style.less';
import DemoModel from '~/routes/demo/models/DemoModel';

export default () => {
    const model = useModel(DemoModel);
    useEffect(() => {
        model.init();
    }, []);
    return (
        <div className={style.container}>
            <div className={style.header}>李春你好</div>
            <div className={style.content}>

                hello world

            </div>
        </div>

    );
};
