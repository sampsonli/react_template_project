/* eslint-disable react/prop-types */
import React, {useRef} from 'react';
import {useInitModel} from 'mtor';

import TestModel, {all} from '~/routes/pc/models/TestModel';
import style from './style.less';

export default () => {
    const canvas = useRef();
    const model = useInitModel(TestModel, () => {
        model.init(canvas.current);
        model.play();
    }, true);
    return (
        <div className={style.container}>
            <div className={`${style.content} ${window._isMobile ? style.mobile : ''}`}>
                <div className={style.opts}>
                    <div className={style.btn} onClick={model.play}>播放</div>
                    <div className={style.btn} onClick={model.playAndSaveFile}>播放视频并保存</div>
                </div>
                <canvas width={model.width} height={model.height} ref={canvas} />

            </div>

        </div>

    );
};
