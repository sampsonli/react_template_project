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
    getToken: {
        url: '/auth/thirdParty/getToken',
        method: 'get',
    },
};
export default generator(Api);
