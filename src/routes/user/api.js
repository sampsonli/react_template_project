import {generator} from '~/common/ajax';

const Api = {
    getCaptchapairImg: {
        url: '/tspauth/unified/getCaptchapairImg',
        method: 'get',
    },
    doLogin: {
        url: '/v1/user/login',
        method: 'post',
    },
};
export default generator(Api);
