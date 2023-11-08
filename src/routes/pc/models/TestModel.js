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

    dataView;

    allElements = [];

    video;

    generateFromVideo() {
        return new Promise((resolve => {
            const {allElements} = this;
            const video = document.createElement('video');
            this.video = video;
            video.autoplay = true;
            video.src = 'Badapplesmall.mp4';
            const canvas = document.createElement('canvas');
            canvas.width = allElements[0].length;
            canvas.height = allElements.length;
            const ctx = canvas.getContext('2d');
            const dataView = new DataView(new ArrayBuffer(60 * 80 / 8 * 30 * 240));
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
                allElements.forEach((row, i) => {
                    row.forEach((ele, j) => {
                        const image = ctx.getImageData(j, i, 1, 1);
                        if (image.data[0] <= 80) {
                            ele.classList.add('current');
                            byte |= 2 ** offset;
                        } else {
                            ele.classList.remove('current');
                        }
                        offset++;
                        if (offset === 8) {
                            offset = 0;
                            dataView.setUint8(index, byte);
                            byte = 0;
                            index++;
                        }
                    });
                });
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
        const {allElements} = this;
        const dataView = await this.loadFromFile();

        let index = 0;
        let offset = 0;
        let byte = dataView.getUint8(index);
        let flag = true; // 保持30fps
        function render() {
            if (index >= dataView.byteLength) return;
            window.requestAnimationFrame(render);
            if (flag) {
                flag = false;
                return;
            }
            flag = true;
            allElements.forEach((row) => {
                row.forEach((ele) => {
                    if (byte & (2 ** offset)) {
                        ele.classList.add('current');
                    } else {
                        ele.classList.remove('current');
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
                });
            });
        }
        render();
    }
}
export default Demo2Model;
