import { service, Model } from 'mtor';
import {wait} from '~/common/utils';

@service(module.id)
class Demo2Model extends Model {
    loaded = false;

    /**
     * @type {number}
     */
    num;

    num2;

    async asyncFnDemo() {
        this.num = 1;
        this.num2 = 100;
        await wait(1000);
        this.num = 2;
        this.num2 = 300;
        await wait(2000);
        this.num = 3;
        this.num2 = 0;
        this.num3 = 3333;
    }
}
export default Demo2Model;

module.hot && module.hot.accept();
