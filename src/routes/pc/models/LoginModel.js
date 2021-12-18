import { service, Model } from 'mtor';

import api from './api';

@service(module.id)
class LoginModel extends Model {
    loaded = false;

    /**
     * @type {number}
     */
    num;

    init() {
        if (this.loaded) return;
        console.log('登錄中');
        this.loaded = true;
    }
}
export default LoginModel;

module.hot && module.hot.accept();
