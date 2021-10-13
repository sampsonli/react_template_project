import React, {useEffect} from 'react';
import {useModel} from 'redux-spring';
import style from './style.less';
import DemoModel from '~/routes/demo/models/DemoModel';

export default () => {
    const model = useModel(DemoModel);
    useEffect(() => {
        model.init();
        // navigator.getUserMedia = navigator.getUserMedia ||
        //     navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        const constraints = { // 音频、视频约束
            audio: true, // 指定请求音频Track
            video: {  // 指定请求视频Track
                mandatory: { // 对视频Track的强制约束条件
                    width: { min: 320 },
                    height: { min: 180 }
                },
                optional: [ // 对视频Track的可选约束条件
                    { frameRate: 30 }
                ]
            }
        };

        const video = document.querySelector('video');

        function successCallback(stream) {
            if (window.URL) {
                video.src = window.URL.createObjectURL(stream);
            } else {
                video.src = stream;
            }
        }

        function errorCallback(error) {
            console.log('navigator.getUserMedia error: ', error);
        }
        console.log(window.navigator.getUserMedia);
        // navigator.getUserMedia(constraints, successCallback, errorCallback);
    }, []);
    const { loaded } = model;
    return (
        <div className={style.container}>
            <div className={style.header}>李春你好12</div>
            <div className={style.content}>

               <video/>
            </div>
        </div>

    );
};
