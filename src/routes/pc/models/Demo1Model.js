import { service, Model } from '~/common/spring';
import { eventBus } from '~/common/EventBus';
import { wait } from '~/common/utils';

@service(module.id)
class Demo1Model extends Model {
    loading = false;

    list

    keyword;

    init() {
        // console.log('init')
        this.getList();
    }

    doSearch() {
        eventBus.emit('setMenuInfo', {
            paths: ['测试1', '详情'],
        });
    }

    * getList() {
        this.loading = true;
        console.log('list1');
        yield wait(500);
        console.log('list2')
        this.list = [
            { id: 1, title: 'hello1', star: ''.padStart(1, '★') },
            { id: 2, title: 'hello2', star: ''.padStart(2, '★') },
            { id: 3, title: 'hello3', star: ''.padStart(3, '★') },
            { id: 4, title: 'hello4', star: ''.padStart(2, '★') },
            { id: 5, title: 'hello5', star: ''.padStart(4, '★') },
        ];
        this.loading = false;
        yield wait(500);
        console.log('list3')
    }
}
export default Demo1Model;

module.hot && module.hot.accept();
