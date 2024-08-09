import { Model, define } from 'mtor';

import api from './api';

@define(module)
class LoginModel extends Model {
    loaded = false;

    /**
     * @type {number}
     */
    num = 0;
    num2 = 0;

    init() {
        if (this.loaded) return;
        console.log('登錄中');
        this.loaded = true;
    }

    changeNum() { 
        this.num += 4;
        if(this.num  % 10 === 0) {
            this.num2++;
        }
    }
}
export default LoginModel;

