import {Model, define} from 'mtor';

@define(module)
class PcModel extends Model {
    loaded = false;

    static ignoreSet = new Set(['/pc/login', '/pc/test']);

    isMobile = window._isMobile;

    /**
     * 后续左侧菜单可以从后端接口获取
     */
    menuList = [
        {key: '/pc', label: '首页'},
        {key: '/pc/list', label: '列表'},
        {key: '/pc/chart', label: '图表'},
    ];

    /**
     * @type {import('./types/Common').UserInfo}
     */
    userInfo;

    async init() {
        // await wait(16.6);
        this.userInfo = {name: '李春', userId: '1', avatar: '1'};
        this.loaded = true;
    }
}

export default PcModel;
