import { service, Model, inject } from 'redux-spring';
import UserModel from '~/models/UserModel';
import api from './api';

@service(module.id)
class DemoModel extends Model {
    loaded = false;

    /**
     * 此处可以拿到用户信息
     * @type {UserModel}
     * @private
     */
    @inject(UserModel)
    user;

    /**
     * @type {number}
     */
    num;

    * init() {
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
