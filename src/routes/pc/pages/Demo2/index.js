import React, { useEffect } from 'react';
import { useModel } from 'redux-spring';
import style from './style.less';
import DemoModel from '~/routes/pc/models/DemoModel';

export default () => {
    const model = useModel(DemoModel);
    useEffect(() => {
        model.init();
    }, []);
    return (
        <div className={style.container}>
            <div className={style.content}>

               demo2gtt

            </div>
        </div>

    );
};
