import {
    Model, inject, evtBus, define,
} from 'mtor';
import PcModel from '~/routes/pc/models/PcModel';
import api from '~/routes/pc/models/api';

@define(module)
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
            paths: ['列表1', this.keyword],
        });
        await this.getList();
    }

    /**
     * @private
     * @type {PcModel}
     */
    @inject(PcModel)
    pcModel;

    async getList() {
        try {
            this.loading = true;
            const {data} = await api.getRemoteData();
            this.list = data.list.slice(0, 10);
            this.loading = false;
        } catch (e) {
            console.log(e.message);
        }
    }

    doDelete(record) {
        this.list = this.list.filter(item => item !== record);
    }
}

export default ListModel;
