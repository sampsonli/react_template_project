/* eslint-disable react/prop-types */
import React from 'react';
import {useInitModel} from 'mtor';

import TestModel from '~/routes/pc/models/TestModel';
import style from './style.less';
import {Button} from 'antd';

export default () => {
    const model = useInitModel(TestModel, () => {
        // model.init();
    }, true);
    return (
        <div className={style.container}>
            <Button onClick={() => model.asyncFnDemo()}>开始</Button>
            {model.num}
            <br/>
            {model.num2}
            <br/>
            {model.num3}
            <Button onClick={() => model.reset()}>清除</Button>
        </div>

    );
};
