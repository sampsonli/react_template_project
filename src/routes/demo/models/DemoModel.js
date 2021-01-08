import {service, Model, inject} from 'redux-spring';
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
        this.num = yield api.getRemoteData();
        this.loaded = true;
        return this.num;
    }

    addOne() {
        if (this.num === undefined) return;
        this.num += 1;
    }

    minusOne() {
        if (this.num === undefined) return;
        this.num -= 1;
    }
}
export default DemoModel;

module.hot && module.hot.accept();
