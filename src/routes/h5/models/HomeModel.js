import {Model, service} from 'mtor';

@service(module.id)
class HomeModel extends Model {
    name = 'lichun2';

    active = {key: 'home', title: '首页'};

    init() {
        this.name = '李春2';
    }
}
export default HomeModel;

module.hot && module.hot.accept();
