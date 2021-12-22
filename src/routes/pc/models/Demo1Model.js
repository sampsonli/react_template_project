import {service, Model, inject, evtBus} from 'mtor';
import { wait } from '~/common/utils';
import PcModel from '~/routes/pc/models/PcModel';

@service(module.id)
class Demo1Model extends Model {
    loading = false;

    list;

    current;

    keyword;

    init() {
        this.getList();
    }

    doSearch() {
        this.keyword = Math.random() * 10000 << 0;
        evtBus.emit('setMenuInfo', {
            paths: ['测试', '详情q2'],
        });
    
    }

    /**
     * @type {PcModel}
     */
    @inject(PcModel)
    pcModel;

    * getList() {
        this.loading = true;
        // console.log('list1');
        yield wait(500);
        // console.log('list2')
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
