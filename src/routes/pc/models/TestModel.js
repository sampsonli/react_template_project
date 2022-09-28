import {Model, define} from 'mtor';
import {wait} from '~/common/utils';

@define(module)
class Demo2Model extends Model {
    loaded = false;

    /**
     * @type {number}
     */
    num = 0;

    async asyncFnDemo() {
        this.num = 0;
        while (this.num < 100) {
            this.num += 10;
            await wait(250);
        }
    }
}
export default Demo2Model;
