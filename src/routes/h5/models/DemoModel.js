import {Model, define} from 'mtor';

@define(module)
class DemoModel extends Model {
    name = 'lichun2';
    age = 0;
    addAge() {
        this.age+=20;
    }


}
export default DemoModel;

