import {Model, define} from 'mtor';

@define(module)
class DemoModel extends Model {
    name = 'lichun2';
    age = 0;
    addAge() {
        this.age+=2;
    }


}
export default DemoModel;

