import React, {useEffect} from 'react';
import {Button} from 'antd';
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

    return (
        <div className={style.container}>
            <div className={style.content}>
                LoginPage
                <Button onClick={model.doLogin}>do login</Button>
            </div>
        </div>

    );
};
