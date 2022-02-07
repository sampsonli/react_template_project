import { generator } from '~/common/ajax';

const Api = {
    getRemoteData: {
        // url: 'https://www.fastmock.site/mock/076e2f3ffbb3afe387cb325e29dc2d2b/v1/user/getUserList',
        url: '/user/getUserList',
        method: 'post',
        sample: {
            list: [{
                id: 0, userName: '', email: '', phone: '', updateTime: 0,
            }],
            total: 22,
        },
    },
};
export default generator(Api);
