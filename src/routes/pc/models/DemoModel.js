import { service, Model } from '~/common/spring';

import api from './api';

@service(module.id)
class DemoModel extends Model {
    loaded = false;

    /**
     * @type {number}
     */
    num;

    init() {
        if (this.loaded) return;
        this.num = 1111;
        this.loaded = true;
    }

    addOne() {
        if (this.num === undefined) return;
        this.num += 1;
    }

    minusOne() {
        if (this.num === undefined) return;
        this.num -= 1;
    }

    jumpLogin() {
        const { href } = window.location;
        const link = `${href.split('#')[0]}#/user/login?from=${encodeURIComponent(href)}`;
        window.location.replace(link);
    }
}
export default DemoModel;

module.hot && module.hot.accept();
