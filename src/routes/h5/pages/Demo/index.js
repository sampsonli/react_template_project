import { Button } from 'antd-mobile';
import { useInitModel } from 'mtor';
import React from 'react';
import DemoModel from '../../models/DemoModel';

export default () => {
    const model = useInitModel(DemoModel);

    return (
        <div>
            <Button color="primary" onClick={() => model.setData({name: 'lichun2223'})}>测试1333</Button>
            {model.name}
        </div>
    );
};
