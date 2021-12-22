import {Model, service} from 'mtor';

@service(module.id)
class H5Model extends Model {
    static ignoreSet = new Set(['/h5/login']);

    loaded = false;

    init() {
        this.loaded = true;
    }
}
export default H5Model;
module.hot && module.hot.accept();
