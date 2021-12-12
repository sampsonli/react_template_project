import React, {useEffect, useRef} from 'react';
import {
    Card, Col, Row,
} from 'antd';
import loadjs from '~/common/loadjs';

const Echarts = () => {
    const ref = useRef();
    useEffect(() => {
        loadjs('lib/echarts.js', 'echarts').then(echarts => {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(ref.current);

            // 指定图表的配置项和数据
            const option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true,
                    },
                ],
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        });
    }, []);
    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card bodyStyle={{width: 800, height: 600}}>
                    <canvas ref={ref} />

                </Card>
            </Col>

        </Row>
    );
};

export default Echarts;
