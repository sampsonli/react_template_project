import React, {useEffect} from 'react';
import {Input} from 'antd';
import {useModel} from 'redux-spring';
import style from './style.less';

import {useQueryParams} from '~/common/pathTools';
import LoginModel from '~/routes/user/models/LoginModel';

export default () => {
    const model = useModel(LoginModel);
    const params = useQueryParams();
    useEffect(() => {
        model.init(params.from);
    }, []);

    const onEnterKey = (e) => {
        if (e.keyCode === 13) {
            model.doLogin();
        }
    };
    const {
        username, password, captchaCode, captchaInfo,
    } = model;
    return (
        <div className={style.loginPage}>
            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.titcn} onClick={model.getToken}>解决方案数据库</div>
                    <div className={style.titen}>Online Solution Database</div>
                </div>

                <div className={style.user}>
                    <Input
                      className={style.input}
                      placeholder="账号/Account name"
                      onChange={({target: {value}}) => model.setData({username: value})}
                      value={username}
                      prefix={<i className={style.employIcon} />}
                    />
                </div>
                <div className={style.pass}>
                    <Input
                      className={style.input}
                      prefix={<i className={style.passIcon} />}
                      type="password"
                      value={password}
                      onChange={({target: {value}}) => model.setData({password: value})}
                      placeholder="密码/Password"
                      onKeyUp={onEnterKey}
                    />
                </div>
                <div className={style.code}>
                    <Input
                      className={style.input}
                      prefix={<i className={style.verifyIcon} />}
                      value={captchaCode}
                      onChange={({target: {value}}) => model.setData({captchaCode: value})}
                      placeholder="验证码/Verification code"
                      onKeyUp={onEnterKey}
                    />
                    <div className={style.codeImg}>
                        {captchaInfo && <img alt="" onClick={model.getCaptcha} src={captchaInfo.imgUrl} />}
                    </div>
                </div>
                <div className={style.btn} onClick={model.doLogin}>登录/Login</div>
            </div>

        </div>
    );
};
