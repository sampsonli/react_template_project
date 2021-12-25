import {Model, service} from 'mtor';

@service(module.id)
class HomeModel extends Model {
    name = 'lichun2';

    activeKey = 'home';

    init() {
        this.name = '李春2';
    }
}
export default HomeModel;

module.hot && module.hot.accept();
