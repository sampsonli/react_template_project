import React, { useEffect } from 'react';
import { useModel } from 'redux-spring';
import style from './style.less';
import LoginModel from '../../models/LoginModel';

export default () => {
    const model = useModel(LoginModel);
    useEffect(() => {
        model.init();
    }, []);
    return (
        <div className={style.container}>
            <div className={style.header}>用戶登錄</div>
            <div className={style.content}>

                登錄節目

            </div>
        </div>

    );
};
