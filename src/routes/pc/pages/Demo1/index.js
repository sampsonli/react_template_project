import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
    Button, Card, Col, Divider, Input, Row, Table,
} from 'antd';
import React, { useEffect } from 'react';
import { useModel } from 'redux-spring';
import Demo1Model from '~/routes/pc/models/Demo1Model';
import style from './style.less';

const { Column } = Table;

export default () => {
    const model = useModel(Demo1Model);
    useEffect(() => {
        model.init();
    }, []);
    const { list } = model;
    return (
        <div className={style.container}>
            <div>
                <Card className={style.search}>
                    <Row>
                        <Col span={6} className={style.sItem}>
                            <span className={style.label}>查询条件：</span>
                            <Input className={style.sInput} />
                        </Col>
                    </Row>

                </Card>
                <Card className={style.table}>
                    <Table
                        bordered
                        rowKey={(record) => record.id}
                        dataSource={list}
                        loading={false}
                        pagination={false}
                    >
                        <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id} />
                        <Column title="标题" dataIndex="title" key="title" width={200} align="center" />
                        <Column title="推荐指数" dataIndex="star" key="star" width={195} align="center" />

                        <Column title="时间" dataIndex="date" key="date" width={195} align="center" />
                        <Column title="操作"
                            key="action"
                            width={195}
                            align="center"
                            render={() => (
                                <span>
                                    <Button type="primary" shape="circle" icon={<EditOutlined />} title="编辑" />
                                    <Divider type="vertical" />
                                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} title="删除" />
                                </span>
                            )}
                        />
                    </Table>
                </Card>

            </div>

        </div>

    );
};
