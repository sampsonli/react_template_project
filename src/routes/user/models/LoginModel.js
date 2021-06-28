import {Model, service} from 'redux-spring';
import {parseQueryStr} from '~/common/pathTools';

@service(module.id)
class LoginModel extends Model {
    username;

    password;

    /**
     * @type {string}
     */
    from;

    code = 123;

    init(from) {
        this.from = from;
    }

    doLogin() {
        let link;
        if (this.from.indexOf('#') > -1) { // hash
            const tmp = this.from.split('#')[1];
            const qs = parseQueryStr(tmp.split('?')[1]);
            qs.code = this.code;
            link = `${this.from.split('?')[0] }?${ Object.keys(qs)
                .map(key => `${key}=${qs[key]}`)
                .join('&')}`;
        } else { // history
            const qs = parseQueryStr(this.from.split('?')[1]);
            qs.code = this.code;
            link = `${this.from.split('?')[0] }?${ Object.keys(qs)
                .map(key => `${key}=${qs[key]}`)
                .join('&')}`;
        }
        window.location.replace(link);
        window.location.reload();
    }
}

export default LoginModel;
