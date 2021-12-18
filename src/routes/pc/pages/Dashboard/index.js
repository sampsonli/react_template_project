import React, { useEffect } from 'react';
import { useModel } from 'mtor';
import style from './style.less';
// import Demo2Model from '~/routes/pc/models/Demo2Model';
import StatisticDemo from '~/routes/pc/pages/Dashboard/components/StatisticDemo';
import Echarts from '~/routes/pc/pages/Dashboard/components/Echarts';

export default () => {
    // const model = useModel(Demo2Model);
    useEffect(() => {
        // model.init();
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
