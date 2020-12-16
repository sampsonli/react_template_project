import React, {useEffect, useRef, useState} from 'react';
import style from './style.less';

const getGray = (r, g, b) => (r * 299 + g * 578 + b * 114) / 1000;
const toText = (g) => {
    // 根据灰度生成相应字符
    /* if (g <= 30) {
        return '+';
    } if (g > 30 && g <= 60) {
        return '+';
    } if (g > 60 && g <= 120) {
        return '+';
    } if (g > 120 && g <= 150) {
        return '+';
    } if (g > 150 && g <= 180) {
        return '+';
    } if (g > 180 && g <= 210) {
        return '+';
    } if (g > 210 && g <= 240) {
        return '+';
    } */

    if (g < 240) {
        return '0';
    }
    return '&nbsp;&nbsp;';
};
let timer;
export default () => {
    const cv = useRef();
    const myVideo = useRef();
    const render = useRef();
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (window.innerWidth < 500) {
            alert('不好意思， 暂不支持在移动端浏览， 请在pc浏览器打开, 谢谢');
        }
    }, []);
    const scale = 1;
    const init = (imgData) => {
        const imgDataArr = imgData.data;
        const imgDataWidth = imgData.width;
        const imgDataHeight = imgData.height;
        let html = '';
        for (let h = 0; h < imgDataHeight; h += 12) {
            let p = '<div>';
            for (let w = 0; w < imgDataWidth; w += 6) {
                const index = (w + imgDataWidth * h) * 4;
                const r = imgDataArr[index];
                const g = imgDataArr[index + 1];
                const b = imgDataArr[index + 2];
                const gray = getGray(r, g, b);
                p += toText(gray);
            }
            p += '</div>';
            html += p;
        }
        render.current.innerHTML = html;
    };
    const drawPic = () => {
        if (myVideo.current.paused) {
            return;
        }
        const context = cv.current.getContext('2d');
        context.drawImage(myVideo.current, 0, 0, cv.current.width, cv.current.height);
        timer = requestAnimationFrame(drawPic);
        const imgData = context.getImageData(0, 0, cv.current.width, cv.current.height);
        init(imgData);
    };

    const capturePic = () => {
        cv.current.width = myVideo.current.videoWidth * scale;
        cv.current.height = myVideo.current.videoHeight * scale;
        render.current.width = `${myVideo.current.videoWidth * scale}px`;
        render.current.height = `${myVideo.current.videoHeight * scale}px`;
        if (timer) return;
        drawPic();
    };
    const pauseVideo = () => {
        cancelAnimationFrame(timer);
        timer = null;
    };
    const doPlay = () => {
        const video = myVideo.current;
        video.play();
        setPlaying(true);
    };
    return (
        <div className={style.container}>
            <div className={style.content}>
                <canvas className={style.canvas} id="cv" ref={cv}/>
                <video
                    className={style.video}
                    webkit-playsinline="true"
                    playsinline
                    x5-playsinline="true"
                    x-webkit-airplay="allow"
                    id="video"
                    onTimeUpdate={capturePic}
                    ref={myVideo}
                    controls
                    onPause={pauseVideo}
                >
                    <source src="badapple.mp4" type="video/mp4"/>
                    {/* <source src="02.mp4" type="video/mp4" /> */}
                </video>
                <div className={style.txt} id="txt" ref={render}/>
                {!playing && (
                    <div>
                        <div onClick={doPlay} className={style.btn}>开始表演</div>
                        <div className={style.tips}>powered by lichun, supported by redux-spring</div>
                    </div>
                )}
            </div>

        </div>
    );
};
