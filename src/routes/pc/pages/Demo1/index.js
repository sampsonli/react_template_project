/* eslint-disable react/prop-types */
import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons';
import {
    Button, Card, Col, Divider, Input, Row, Table, Spin, Popconfirm,
} from 'antd';
import React, {useEffect} from 'react';
import {useModel} from 'mtor';
import Demo1Model from '~/routes/pc/models/Demo1Model';
import style from './style.less';
import Edit from '~/routes/pc/pages/Demo1/components/Edit';

const {Column} = Table;

export default ({hot}) => {
    const model = useModel(Demo1Model);
    useEffect(() => {
        clearTimeout(tempObj[module.id]);
        hot || model.init();
        return () => {
            tempObj[module.id] = setTimeout(model.reset, 20);
        };
    }, []);
    const {
        list,
        keyword,
        loading,
        current,
    } = model;
    return (
        <div className={style.container}>
            <Edit current={current} onClose={() => model.setData({current: null})} />
            <div>
                <Card className={style.search}>
                    <Row>
                        <Col span={4} className={style.sItem}>
                            <span className={style.label}>查询条件：</span>
                            <Input className={style.sInput}
                                value={keyword}
                                onChange={({target: {value}}) => model.setData({keyword: value})}
                            />
                        </Col>
                        <Col span={6} className={style.sItem}>
                            <Button className={style.searchBtn}
                                type="primary"
                                onClick={model.doSearch}
                                icon={<SearchOutlined />}
                            >
                                查询
                            </Button>
                        </Col>
                    </Row>

                </Card>
                <Card className={style.table}>
                    {list && (
                        <Table
                            bordered
                            rowKey={(record) => record.id}
                            dataSource={list}
                            loading={loading}
                            pagination={false}
                        >
                            <Column title="序号"
                                dataIndex="id"
                                key="id"
                                width={200}
                                align="center"
                                sorter={(a, b) => a.id - b.id}
                            />
                            <Column title="标题" dataIndex="title" key="title" width={200} align="center" />
                            <Column title="推荐指数" dataIndex="star" key="star" width={195} align="center" />

                            <Column title="时间" dataIndex="date" key="date" width={195} align="center" />
                            <Column title="操作"
                                key="action"
                                width={195}
                                align="center"
                                render={(value, record) => (
                                        <span>
                                        <Button type="primary"
                                            shape="circle"
                                            onClick={() => model.setData({current: {}})}
                                            icon={<EditOutlined />}
                                            title="编辑"
                                        />
                                        <Divider type="vertical" />
                                            <Popconfirm title="确认删除？" onConfirm={() => model.doDelete(record)}>
                                                <Button type="primary" shape="circle" icon={<DeleteOutlined />} title="删除" />
                                            </Popconfirm>

                                        </span>
                                    )}
                            />
                        </Table>
                    )}
                    {!list && (
                        <Spin spinning tip="加载中...">
                            <div className={style.loading} />
                        </Spin>
                    )}
                </Card>

            </div>

        </div>

    );
};
