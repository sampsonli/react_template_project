import {
    service, Model, inject, evtBus,
} from 'mtor';
import moment from 'moment';
import { wait } from '~/common/utils';
import PcModel from '~/routes/pc/models/PcModel';

@service(module.id)
class Demo1Model extends Model {
    loading = false;

    list;

    current;

    keyword = '查询';

    init() {
        this.getList();
    }

    doSearch() {
        evtBus.emit('setMenuInfo', {
            paths: ['列表122', this.keyword],
        });
        this.getList();
    }

    /**
     * @type {PcModel}
     */
    @inject(PcModel)
    pcModel;

    async getList() {
        this.loading = true;
        // console.log('list1');
        await wait(300);
        // console.log('list2')
        this.list = [
            {
                id: 1,
                title: 'hello',
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
            {
                id: 6,
                title: '李春',
                star: ''.padStart(1, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
            {
                id: 7,
                title: '李春7',
                star: ''.padStart(12, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
            {
                id: 8,
                title: '李春8',
                star: ''.padStart(4, '★'),
                date: moment()
                    .format('YYYY-MM-DD'),
            },
        ];
        this.loading = false;
    }

    doDelete(record) {
        this.list = this.list.filter(item => item !== record);
    }
}

export default Demo1Model;

module.hot && module.hot.accept();
