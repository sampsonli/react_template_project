import {Model, define} from 'mtor';

export const all = (() => {
    const _all = [];
    for (let i = 0; i < 60; i++) {
        const row = [];
        row.key = i;
        _all.push(row);
        for (let j = 0; j < 80; j++) {
            row.push(`${i}-${j}`);
        }
    }
    return _all;
})();

@define(module)
class Demo2Model extends Model {
    loaded = false;

    allElements = [];

    video;

    init() {
        const allElements = [];
        all.forEach(row => {
            const rowEle = [];
            allElements.push(rowEle);
            row.forEach(col => {
                rowEle.push(document.getElementById(col));
            });
        });
        this.allElements = allElements;
        const video = document.createElement('video');
        this.video = video;
        video.autoplay = true;
        video.src = 'Badapplesmall.mp4';
        const canvas = document.createElement('canvas');
        canvas.width = allElements[0].length;
        canvas.height = allElements.length;
        const ctx = canvas.getContext('2d');
        let flag = true; // 保持30fps
        function render() {
            window.requestAnimationFrame(render);
            if (flag) {
                flag = false;
                return;
            }
                flag = true;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);

            allElements.forEach((row, i) => {
                row.forEach((ele, j) => {
                    const image = ctx.getImageData(j, i, 1, 1);
                    if (image.data[0] <= 80) {
                        ele.classList.add('current');
                    } else {
                        ele.classList.remove('current');
                    }
                });
            });
        }
        render();
    }

    play() {
        this.video.play();
    }
}
export default Demo2Model;
