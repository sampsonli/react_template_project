import React, { useEffect } from 'react';
import {Table, Button, Divider} from 'antd';
import { useModel } from 'redux-spring';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import style from './style.less';
import Demo1Model from '~/routes/pc/models/Demo1Model';

const {Column} = Table;

export default () => {
    const model = useModel(Demo1Model);
    useEffect(() => {
        model.init();
    }, []);
    const {list} = model;
    return (
        <div className={style.container}>
             <Table
                 bordered
                 rowKey={(record) => record.id}
                 dataSource={list}
                 loading={false}
                 pagination={false}
             >
          <Column title="序号" dataIndex="id" key="id" width={200} align="center" sorter={(a, b) => a.id - b.id} />
          <Column title="标题" dataIndex="title" key="title" width={200} align="center" />

          <Column title="时间" dataIndex="date" key="date" width={195} align="center" />
          <Column title="操作"
              key="action"
              width={195}
              align="center"
              render={(text, row) => (
            <span>
              <Button type="primary" shape="circle" icon={<EditOutlined />} title="编辑" />
              <Divider type="vertical" />
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} title="删除" />
            </span>
          )}
          />
             </Table>
        </div>

    );
};
