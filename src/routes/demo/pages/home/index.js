import React, {useEffect} from 'react';
import {useModel} from 'redux-spring';
import style from './style.less';
import HomeModel from '~/routes/demo/models/HomeModel';

export default () => {
    const model = useModel(HomeModel);
    const {
        result, frag,
    } = model;
    useEffect(() => {
        model.init();
    }, []);
    return (
        <div className={style.container}>
            <div className={style.content}>
                <video
                    className={style.video}
                    webkit-playsinline="true"
                    playsInline
                    x5-playsinline="true"
                    x-webkit-airplay="allow"
                    id="video"
                    controls="true"
                >
                    <source src="http://a.sinwai.cn/badapple.mp4" type="video/mp4" />
                </video>
                <div className={style.txt} onClick={model.drawLottery}>
                    开始摇奖55
                </div>


                <div className={style.txtTest}>
                    开奖号码：
                    {result}
                </div>
            </div>

        </div>
    );
};
