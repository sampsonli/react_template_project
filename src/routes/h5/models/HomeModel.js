import {Model, service} from 'mtor';

@service(module.id)
class HomeModel extends Model {
    name = 'lichun2';

    init() {
        this.name = '李春';
    }
}
export default HomeModel;

module.hot && module.hot.accept();
