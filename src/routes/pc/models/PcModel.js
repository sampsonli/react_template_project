import {service, Model} from 'mtor';
import { wait } from '~/common/utils';

@service(module.id)
class PcModel extends Model {
    loaded = false;

    static ignoreSet = new Set(['/pc/login', '/pc/rain']);

    isMobile = window._isMobile;

    /**
     * 后续左侧菜单可以从后端接口获取
     */
    menuList = [
        {key: '/pc/home', title: '首页'},
        {key: '/pc/list', title: '列表'},
        {key: '/pc/chart', title: '图表'},
        {key: '/pc/test', title: '测试'},
    ];

    /**
     * @type {import('./types/Common').UserInfo}
     */
    userInfo;

    async init() {
        await wait(16.6);
        this.userInfo = {name: '李春', userId: '1', avatar: '1'};
        this.loaded = true;
    }
}

export default PcModel;

module.hot && module.hot.accept();
