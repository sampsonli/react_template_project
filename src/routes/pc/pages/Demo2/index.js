import React, { useEffect } from 'react';
import { useModel } from 'mtor';
import Demo2Model from '~/routes/pc/models/Demo2Model';
import style from './style.less';

export default () => {
    const model = useModel(Demo2Model);
    useEffect(() => model.reset, []);
    const { num, num2, num3 } = model;
    return (
        <div className={style.container}>

            <div onClick={model.asyncFnDemo} className={style.btn}>test</div>
            <div>
                num:
                {num}
            </div>
            <div>
                num2:
                {num2}
            </div>
            <div>
                num3:
                {num3}
            </div>
        </div>

    );
};
