import { service, Model } from 'redux-spring';
import { wait } from '~/common/utils';

@service(module.id)
class Demo1Model extends Model {
    loading = false;

    list

    keyword;

    init() {
        this.getList();
    }

    * getList() {
        this.loading = true;
        yield wait(500);
        this.list = [
            { id: 1, title: 'hello1', star: ''.padStart(1, '★') },
            { id: 2, title: 'hello2', star: ''.padStart(2, '★') },
            { id: 3, title: 'hello3', star: ''.padStart(3, '★') },
            { id: 4, title: 'hello4', star: ''.padStart(2, '★') },
            { id: 5, title: 'hello5', star: ''.padStart(4, '★') },
        ];
        this.loading = false;
    }
}
export default Demo1Model;

module.hot && module.hot.accept();
