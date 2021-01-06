import {service, Model, inject} from 'redux-spring';
import UserModel from '~/models/UserModel';

@service(module.id)
class DemoModel extends Model {
    loaded = false;

    /**
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
        console.log(this.user);
        this.num = yield new Promise((resolve) => setTimeout(() => resolve(10), 200));
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
}
export default DemoModel;

module.hot && module.hot.accept();
