import {Model, service} from 'redux-spring';

@service('user')
class UserModel extends Model {
    /**
     * @type {{name: string, sex: number}}
     */
    info

    menus = [
        {key: 1, value: '首页'},
    ]

    init() {
        if (this.info) return;
        this.getUserInfo();
    }

    * getUserInfo() {
        this.info = yield new Promise((resolve) => setTimeout(() => resolve({name: 'sampsonli', sex: 1}), 100));
    }
}
export default UserModel;
