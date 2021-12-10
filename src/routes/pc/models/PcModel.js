import {service, Model} from 'redux-spring';
import { replacePath } from '~/common/pathTools';

/**
 * @typedef {import('./types/Common').UserInfo} UserInfo
 */

@service(module.id)
class PcModel extends Model {
    loaded = true;

    static ignoreSet = new Set(['/pc/login', '/pc/rain']);

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
    userInfo = {name: '李春'};

    init() {
        this.userInfo = {name: '李春'};

        this.loaded = true;
    }

    doLogout() {
        //
        replacePath('/pc/login');
    }
}

export default PcModel;

module.hot && module.hot.accept();
