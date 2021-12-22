import React, { useEffect } from 'react';
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
            <div className={style.statistic}>
                <StatisticDemo />
            </div>
            <div className={style.echart}>
                <Echarts />
            </div>

        </div>

    );
};
