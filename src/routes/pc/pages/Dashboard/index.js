import React, { useEffect } from 'react';
import { useModel } from '~/common/spring';
import style from './style.less';
import DemoModel from '~/routes/pc/models/DemoModel';
import StatisticDemo from '~/routes/pc/pages/Dashboard/components/StatisticDemo';
import Echarts from '~/routes/pc/pages/Dashboard/components/Echarts';

export default () => {
    const model = useModel(DemoModel);
    useEffect(() => {
        model.init();
    }, []);
    return (
        <div
            // loading={loading.models.dashboard && sales.length === 0}
            className={style.dashboard}
        >
            <StatisticDemo />
            <Echarts/>
        </div>

    );
};