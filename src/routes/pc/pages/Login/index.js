import React, { useEffect } from 'react';
import { useModel } from 'mtor';
import style from './style.less';
import LoginModel from '../../models/LoginModel';

function Login () {
    const model = useModel(LoginModel);
    useEffect(() => {
        model.init();
    }, []);
    const {num} = model;
    return (
        <div className={style.container}>
            <div className={style.header}>用户登录</div>
            <div className={style.content} onClick={model.changeNum}>

                登录---{num}

            </div>
        </div>

    );
};
export default Login;