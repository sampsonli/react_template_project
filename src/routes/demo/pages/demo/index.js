import React, {useEffect} from 'react';
import {useModel} from 'redux-spring';
import {DatePicker} from 'antd';
import style from './style.less';
import DemoModel from '~/routes/demo/models/DemoModel';
import {pushPath} from '~/common/pathTools';

export default () => {
    const model = useModel(DemoModel);
    useEffect(() => {
        model.init();
    }, []);
    const {
        num, loaded,
    } = model;
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.add} onClick={model.addOne}>+1</div>
                <div className={style.num} onClick={() => pushPath('./demo/rain', {name: 'hello'})}>{loaded ? num : '加载中'}</div>
                <div className={style.minus} onClick={model.minusOne}>-</div>
            </div>
            <DatePicker />
        </div>

    );
};
