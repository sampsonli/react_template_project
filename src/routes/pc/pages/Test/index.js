/* eslint-disable react/prop-types */
import React from 'react';
import {useInitModel} from 'mtor';

import TestModel from '~/routes/pc/models/TestModel';
import style from './style.less';

export default () => {
    const model = useInitModel(TestModel, () => {
        // model.init();
    });
    return (
        <div className={style.container} onClick={model.asyncFnDemo}>
            {model.num}
            <br/>
            {model.num2}
            <br/>
            {model.num3}
        </div>

    );
};
