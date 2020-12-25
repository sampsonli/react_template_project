import {service, Model} from 'redux-spring';

@service(module.id)
class DemoModel extends Model {
    loaded = false;

    /**
     * @type {number}
     */
    num;

    * init() {
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
