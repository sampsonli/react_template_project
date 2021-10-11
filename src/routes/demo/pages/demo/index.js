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
                王阿敏， 我爱你！
            </div>
        </div>

    );
};
