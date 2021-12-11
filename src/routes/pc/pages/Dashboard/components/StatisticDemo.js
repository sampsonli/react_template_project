import React from 'react';
import {
 Statistic, Card, Col, Row,
} from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    LikeOutlined,
} from '@ant-design/icons';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const StatisticDemo = () => (
        <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="成交额"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="退款率"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="觉得很赞"
                            value={1128}
                            prefix={<LikeOutlined />}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card>
                        <Statistic title="待收款（笔）" value={93} suffix="/ 100" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Countdown title="倒计时" value={deadline} format="HH:mm:ss:SSS" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Countdown
                            title="剩余排期"
                            value={deadline}
                            format="D 天 H 时 m 分 s 秒"
                        />
                    </Card>
                </Col>
        </Row>
    );

export default StatisticDemo;
