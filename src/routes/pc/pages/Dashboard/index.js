import React, { useEffect } from 'react';
import { useModel } from 'redux-spring';
import style from './style.less';
import DemoModel from '~/routes/pc/models/DemoModel';
import {Row, Col, Card} from 'antd';

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
            <Row gutter={24}>
                <Col lg={18} md={24}>
                    <Card
                        bordered={false}
                        bodyStyle={{
                            padding: '24px 36px 24px 0',
                        }}
                    >

                    </Card>
                </Col>
                <Col lg={6} md={24}>
                    <Row gutter={24}>
                        <Col lg={24} md={12}>
                            <Card
                                bordered={false}
                                className={style.weather}
                                bodyStyle={{
                                    padding: 0,
                                    height: 204,
                                    background: 'blue',
                                }}
                            >

                            </Card>
                        </Col>
                        <Col lg={24} md={12}>
                            <Card
                                bordered={false}
                                className={style.quote}
                                bodyStyle={{
                                    padding: 0,
                                    height: 204,
                                    background: 'pink',
                                }}
                            >

                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col lg={12} md={24}>
                    <Card bordered={false}>

                    </Card>
                </Col>
                <Col lg={12} md={24}>
                    <Card bordered={false}>

                    </Card>
                </Col>
                <Col lg={24} md={24}>
                    <Card
                        bordered={false}
                        bodyStyle={{
                            padding: '24px 36px 24px 0',
                        }}
                    >

                    </Card>
                </Col>
                <Col lg={8} md={24}>
                    <Card bordered={false}>

                    </Card>
                </Col>
                <Col lg={8} md={24}>
                    <Card bordered={false} >

                    </Card>
                </Col>
                <Col lg={8} md={24}>
                    <Card
                        bordered={false}

                    >
                    </Card>
                </Col>
            </Row>
        </div>

    );
};
