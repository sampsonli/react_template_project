import {Model, define} from 'mtor';

const vHeight = 60;
const vWidth = 80;

@define(module)
class Demo2Model extends Model {
    loaded = false;

    dataView;

    video;

    width;

    height;

    ctx;

    generateFromVideo() {
        return new Promise((resolve => {
            const video = document.createElement('video');
            this.video = video;
            video.autoplay = true;
            video.src = 'Badapplesmall.mp4';
            const canvas = document.createElement('canvas');
            canvas.width = vWidth;
            canvas.height = vHeight;
            const ctx = canvas.getContext('2d');
            const dataView = new DataView(new ArrayBuffer(vHeight * vWidth / 8 * 30 * 240));
            let index = 0;
            let offset = 0;
            let byte = 0;
            let flag = true; // 保持30fps
            function render() {
                // if (video.ended || index > 100000) {
                if (video.ended) {
                    const dv = new DataView(dataView.buffer, 0, index);
                    resolve(dv);
                    video.pause();
                    return;
                }
                window.requestAnimationFrame(render);
                if (flag) {
                    flag = false;
                    return;
                }
                flag = true;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
                for (let r = 0; r < vHeight; r++) {
                    for (let c = 0; c < vWidth; c++) {
                        const image = ctx.getImageData(c, r, 1, 1);
                        if (image.data[0] <= 80) {
                            byte |= 2 ** offset;
                        }
                        offset++;
                        if (offset === 8) {
                            offset = 0;
                            dataView.setUint8(index, byte);
                            byte = 0;
                            index++;
                        }
                    }
                }
            }
            video.onplay = () => {
                render();
            };
        }));
    }

    async loadFromFile() {
        return new Promise((resolve => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'mp4.blob');
            xhr.responseType = 'arraybuffer';
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    /**
                     *
                     * @type {ArrayBuffer}
                     */
                    const data = xhr.response;
                    resolve(new DataView(data));
                }
            };
            xhr.send();
        }));
    }

    init(canvas) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }

    async playAndSaveFile() {
        const dataView = await this.generateFromVideo();
        const blob = new Blob([new Uint8Array(dataView.buffer, 0, dataView.byteLength)]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mp4.blob';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async play() {
        const dataView = await this.loadFromFile();
        let index = 0;
        let offset = 0;
        let byte = dataView.getUint8(index);
        let flag = true; // 保持30fps
        const {ctx, width, height} = this;
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'red';
        function render() {
            if (index >= dataView.byteLength) return;
            window.requestAnimationFrame(render);
            if (flag) {
                flag = false;
                return;
            }
            flag = true;

            ctx.clearRect(0, 0, width, height);

            for (let r = 0; r < vHeight; r++) {
                for (let c = 0; c < vWidth; c++) {
                    if (byte & (2 ** offset)) {
                        // ctx.fillRect(c * 10, r * 10, 10, 10);
                        ctx.beginPath();
                        ctx.arc(c * 10 + 5, r * 10 + 5, 3, 0, 2 * Math.PI, false);
                        ctx.stroke();
                        ctx.closePath();
                    } else {
                        // ele.classList.remove('current');
                    }
                    offset++;
                    if (offset === 8) {
                        index++;
                        offset = 0;
                        if (index >= dataView.byteLength) {
                            byte = 0;
                        } else {
                            byte = dataView.getUint8(index);
                        }
                    }
                }
            }
        }
        render();
    }
}
export default Demo2Model;
