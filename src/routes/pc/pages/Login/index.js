import React, { useEffect } from 'react';
import { useModel } from 'mtor';
import style from './style.less';
import LoginModel from '../../models/LoginModel';

export default () => {
    const model = useModel(LoginModel);
    useEffect(() => {
        model.init();
    }, []);
    const {num, num2} = model;
    return (
        <div className={style.container}>
            <div className={style.header}>用户登录</div>
            <div className={style.content} onClick={model.changeNum}>
                <div className={style.item}>{num}</div>
                <div className={style.item}>{num2}</div>
                <div className={style.item}>{num}</div>
                <div className={style.item}>{num2}</div>
                <div className={style.item}>{num}</div>

            </div>
        </div>

    );
};
