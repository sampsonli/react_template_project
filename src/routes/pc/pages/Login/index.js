import React, { useEffect } from 'react';
import { useModel } from 'mtor';
import style from './style.less';
import LoginModel from '../../models/LoginModel';

export default () => {
    const model = useModel(LoginModel);
    useEffect(() => {
        model.init();
    }, []);
    const {num} = model;
    return (
        <div className={style.container}>
            <div className={style.header}>用戶登錄</div>
            <div className={style.content} onClick={model.changeNum}>

                登录111---{num}

            </div>
        </div>

    );
};
