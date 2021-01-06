import {Model, service} from 'redux-spring';

@service('user')
class UserModel extends Model {
    info

    init() {
        console.log('init user');
        this.getUserInfo();
    }

    * getUserInfo() {
        this.info = yield new Promise((resolve) => setTimeout(() => resolve({name: 'sampsonli', sex: 1}), 100));
    }
}
export default UserModel;
