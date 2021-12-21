import {service, Model, inject} from 'mtor';
import moment from 'moment';
import {eventBus} from '~/common/EventBus';
import {wait} from '~/common/utils';
import PcModel from '~/routes/pc/models/PcModel';

@service(module.id)
class Demo1Model extends Model {
    loading = false;

    list;

    current;

    keyword = '李春1';

    init() {
        this.getList();
    }

    doSearch() {
        // this.keyword = Math.random() * 10000 << 0;
        eventBus.emit('setMenuInfo', {
            paths: ['测试', '详情1'],
        });
        this.getList();
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
            {
                id: 1,
                title: 'hello1',
                star: ''.padStart(1, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
            {
                id: 2,
                title: '李春',
                star: ''.padStart(12, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
            {
                id: 3,
                title: 'hello3',
                star: ''.padStart(3, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
            {
                id: 4,
                title: 'hello4',
                star: ''.padStart(6, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
            {
                id: 5,
                title: 'hello5',
                star: ''.padStart(14, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
        ];
        this.loading = false;
    }
}

export default Demo1Model;

module.hot && module.hot.accept();
