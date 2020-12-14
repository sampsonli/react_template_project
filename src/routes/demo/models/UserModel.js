import {Model, service} from 'redux-spring';

@service('usermodel')
class UserModel extends Model {
  name = 'lichun';
}
export default UserModel;
