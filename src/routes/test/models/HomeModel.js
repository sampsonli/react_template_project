import {service, Model, inject} from 'redux-spring';
import UserModel from '~/routes/test/models/UserModel';

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(time);
        }, time);
    });
}

@service(module.id)
class HomeModel extends Model {
    loaded = false;

    static a = 7;

    loading = false;

    #raf;

    #interval;

    #bs = 1;

    frag = 60;

    result = '888';

    /**
     * @type {UserModel}
     * @private
     */
    @inject(UserModel) userModel;

    /**
     * 初始化方法调用
     */
    init() {
        if (this.loaded) return;
        let i = 0;

        const rafCb = () => {
            i = 1 + i;
            this.#raf = requestAnimationFrame(rafCb);
        };
        this.#raf = requestAnimationFrame(rafCb);
        this.#interval = setInterval(() => {
            this.setData({frag: i / this.#bs});
            i = 0;
        }, 1000 * this.#bs);
        this.loaded = true;
    }

    * drawLottery() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        let i = 30;
        while (i--) {
            [, this.result] = String(Math.random().toFixed(6)).split('.');
            if (i < 6) {
                yield wait((6 - i) * 100);
            } else {
                yield wait(100);
            }
        }
        this.loading = false;
    }
}
export default HomeModel;

module.hot && module.hot.accept();
