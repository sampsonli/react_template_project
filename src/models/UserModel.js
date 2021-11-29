import {Model, service} from 'redux-spring';

@service('user')
class UserModel extends Model {
    loaded = false;

    /**
     * @type {{name: string, sex: number}}
     */
    userInfo

    menus = [
        {key: '/pc/home', title: '首页'},
        {key: '/pc/rain', title: 'demo'},
    ]

    init() {
        if (this.info) {
            this.loaded = true;
            return;
        }
        this.getUserInfo();
    }

    * getUserInfo() {
        this.userInfo = yield new Promise((resolve) => setTimeout(() => resolve({name: 'sampsonli', sex: 1}), 100));
        this.loaded = true;
    }
}
export default UserModel;
