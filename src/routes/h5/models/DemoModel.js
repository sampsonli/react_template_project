import {Model, service} from 'mtor';

@service(module.id)
class DemoModel extends Model {
    name = 'lichun2';


}
export default DemoModel;

module.hot && module.hot.accept();
