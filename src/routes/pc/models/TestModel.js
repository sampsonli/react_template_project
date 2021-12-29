import { service, Model } from 'mtor';
import {wait} from '~/common/utils';

@service(module.id)
class Demo2Model extends Model {
    loaded = false;

    /**
     * @type {number}
     */
    num = 0;

    async asyncFnDemo() {
        this.num = 0;
        while (this.num < 100) {
            this.num += 1;
            await wait(250);
        }
    }
}
export default Demo2Model;

module.hot && module.hot.accept();
