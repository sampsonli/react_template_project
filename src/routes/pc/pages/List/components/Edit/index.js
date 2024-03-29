import React, {useEffect, useState} from 'react';
import {Modal} from 'antd';

const Edit = ({
                  onClose,
                  current,
                    onOk,
              }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (current) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, current);
    return (
        <Modal
            open={!!current}
            width="3rem"
            title="编辑"
            onOk={onOk}
            onCancel={onClose}
        >
            {show && <div>hello world</div>}
        </Modal>
    );
};
export default Edit;
