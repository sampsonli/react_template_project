import {service} from 'redux-spring';
import Scroll from '~/common/scroll';

@service('scroll')
class ScrollModel {
    loading = false;

    init() {
        this.loading = false;
    }

    testClick() {
        const a = {b: {c: 1}};
        console.log(a.b ?? 'hello');
    }

    initScroll(el) {
        if (el) {
            const target = el.querySelector('*');
            const headBar = el.querySelector('#headBar');
            target.style.willChange = 'transform';
            headBar.style.willChange = 'transform';
            const transform = typeof target.style.transform !== 'undefined' ? 'transform' : 'webkitTransform';
            const scroller = new Scroll((left, top) => {
                target.style[transform] = `translateY(-${parseInt(top, 10)}px) translateZ(0)`;
                if (top > 100) {
                    headBar.style[transform] = `translateY(${parseInt(top - 100, 10)}px) translateZ(0)`;
                } else {
                    headBar.style[transform] = 'translateY(0) translateZ(0)';
                }
            }, {
                scrollingX: false,
                scrollingY: true,
                animating: true,
                bouncing: false,
                frictionFactor: 0.93,
            });
            scroller.setDimensions(el.offsetWidth, el.offsetHeight, el.offsetWidth, el.scrollHeight);
            el.addEventListener('touchstart', (e) => {
                scroller.doTouchStart(e.touches, e.timeStamp);
            });
            el.addEventListener('touchmove', (e) => {
                scroller.doTouchMove(e.touches, e.timeStamp);
                e.preventDefault();
            });
            el.addEventListener('touchend', (e) => {
                scroller.doTouchEnd(e.timeStamp);
            });
        }
    }
}
export default ScrollModel;
