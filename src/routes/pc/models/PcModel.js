import {service, Model} from 'redux-spring';

@service(module.id)
class PcModel extends Model {
    loaded = true;

    /**
     * 后续左侧菜单可以从后端接口获取
     */
    menuList = [
        {key: '/pc/home', title: '首页'},
        {key: '/pc/rain', title: '测试'},
    ];

    /**
     * @type {User}
     */
    userInfo = {name: '李春'};

    getUserInfo() {
        this.userInfo = {name: '李春'};
        this.loaded = true;
    }

    doLogout() {
        //
    }
}

export default PcModel;

module.hot && module.hot.accept();
