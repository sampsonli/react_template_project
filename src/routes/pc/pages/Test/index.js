/* eslint-disable react/prop-types */
import React from 'react';
import {useInitModel} from 'mtor';

import {Button, Progress} from 'antd';
import TestModel from '~/routes/pc/models/TestModel';
import style from './style.less';

export default () => {
    const model = useInitModel(TestModel, () => {
        // model.init();
    }, true);
    return (
        <div className={style.container}>
            <div className={style.content}>
                <Button onClick={model.asyncFnDemo} type="primary">开始</Button>
                <div className={style.progress}>
                    <Progress percent={model.num} width={160} type="circle" />
                </div>
                <Button onClick={() => model.reset()}>重置</Button>
            </div>

        </div>

    );
};
