import {Model, service} from 'redux-spring';
import {parseQueryStr} from '~/common/pathTools';
import api from '../api';

@service(module.id)
class LoginModel extends Model {
    username;

    password;

    /**
     * @type {string}
     */
    from;

    code = '';

    captchaInfo;

    init(from) {
        this.from = from;
        this.getCaptcha();
    }

    * getCaptcha() {
        const {data} = yield api.getCaptchapairImg();
        this.captchaInfo = data;
    }

    * getToken() {
        // const {data} = yield api.getToken({thirdPartyName: 'third_database', thirdPartyPassword: 'database_pass1234'});
        // console.log(data);
        // sessionStorage.setItem('_token', data);

        const {data: data2} = yield api.getDetail({'stuUserExamVO.examId': '2980088', 'stuUserExamVO.empTryCount': '1'});
        console.log(data2);
    }

    doLogin() {
        let link;
        if (this.from.indexOf('#') > -1) { // hash
            const tmp = this.from.split('#')[1];
            const qs = parseQueryStr(tmp.split('?')[1]);
            qs.type = 'login';
            qs.code = this.code;
            link = `${this.from.split('?')[0] }?${ Object.keys(qs)
                .map(key => `${key}=${qs[key]}`)
                .join('&')}`;
        } else { // history
            const qs = parseQueryStr(this.from.split('?')[1]);
            qs.code = this.code;
            qs.type = 'login';
            link = `${this.from.split('?')[0] }?${ Object.keys(qs)
                .map(key => `${key}=${qs[key]}`)
                .join('&')}`;
        }
        window.location.replace(link);
        if (this.from.split('#')[0] === window.location.href.split('#')[0]) { // 同地址跳转需要刷新页面
            window.location.reload();
        }
    }
}

export default LoginModel;
