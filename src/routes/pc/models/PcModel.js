import {service, Model} from 'mtor';
import { replacePath } from '~/common/pathTools';
import { wait } from '~/common/utils';

/**
 * @typedef {import('./types/Common').UserInfo} UserInfo
 */

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
        {key: '/pc/demo1', title: '测试1'},
        {key: '/pc/demo2', title: '测试2'},
    ];

    /**
     * @type {UserInfo}
     */
    userInfo;

    * init() {
        yield wait(16.6);
        this.userInfo = {name: '李春'};
        this.loaded = true;
    }

    doLogout() {
        replacePath('/pc/login');
    }
}

export default PcModel;

module.hot && module.hot.accept();
