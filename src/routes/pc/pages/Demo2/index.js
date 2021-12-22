import React, { useEffect, useRef } from 'react';
import { useModel } from 'mtor';
import Demo2Model from '~/routes/pc/models/Demo2Model';
import style from './style.less';
import loadjs from '~/common/loadjs';

export default () => {
    const model = useModel(Demo2Model);
    const ref = useRef();
    useEffect(() => {
        loadjs('lib/echarts.js', 'echarts').then(echarts => {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(ref.current);

            const colors = ['#5470C6', '#91CC75', '#EE6666'];
            const option = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    },
                },
                grid: {
                    right: '20%',
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                legend: {
                    data: ['Evaporation', 'Precipitation', 'Temperature'],
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true,
                        },
                        // prettier-ignore
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Evaporation',
                        min: 0,
                        max: 250,
                        position: 'right',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0],
                            },
                        },
                        axisLabel: {
                            formatter: '{value} ml',
                        },
                    },
                    {
                        type: 'value',
                        name: 'Precipitation',
                        min: 0,
                        max: 250,
                        position: 'right',
                        offset: 80,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1],
                            },
                        },
                        axisLabel: {
                            formatter: '{value} ml',
                        },
                    },
                    {
                        type: 'value',
                        name: '温度',
                        min: 0,
                        max: 25,
                        position: 'left',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[2],
                            },
                        },
                        axisLabel: {
                            formatter: '{value} °C',
                        },
                    },
                ],
                series: [
                    {
                        name: 'Evaporation',
                        type: 'bar',
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
                        ],
                    },
                    {
                        name: 'Precipitation',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
                        ],
                    },
                    {
                        name: 'Temperature',
                        type: 'line',
                        yAxisIndex: 2,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
                    },
                ],
            };
            myChart.setOption(option);
        });
    }, []);
    const { num, num2, num3 } = model;
    return (
        <div className={style.container}>

            <div className={style.content} ref={ref} />
        </div>

    );
};
