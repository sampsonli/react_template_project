import {
    service, Model, inject, evtBus,
} from 'mtor';
import moment from 'moment';
import { wait } from '~/common/utils';
import PcModel from '~/routes/pc/models/PcModel';
import api from '~/routes/pc/models/api';

@service(module.id)
class ListModel extends Model {
    loading = false;

    list;

    current;

    keyword = '查询';

    init() {
        this.getList();
    }

    async doSearch() {
        evtBus.emit('setMenuInfo', {
            paths: ['列表', this.keyword],
        });
        await this.getList();
    }

    /**
     * @type {PcModel}
     */
    @inject(PcModel)
    pcModel;

    async getList() {
        this.loading = true;
        const {data} = await api.getRemoteData();
        this.list = data.list.slice(0, 10);
        this.loading = false;
    }

    doDelete(record) {
        this.list = this.list.filter(item => item !== record);
    }
}

export default ListModel;

module.hot && module.hot.accept();
