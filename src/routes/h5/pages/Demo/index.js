import { Button } from 'antd-mobile';
import { useInitModel } from 'mtor';
import React from 'react';
import DemoModel from '../../models/DemoModel';

const Demo = () => {
    const model = useInitModel(DemoModel);

    return (
        <div>
            <Button color="primary" onClick={() => model.addAge()}>测试13</Button>
            {model.age}
        </div>
    );
}
export default Demo;