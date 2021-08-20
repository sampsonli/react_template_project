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
    getDetail: {
        url: '/KMS/learning/stuExamAjax_findExamDetails.action',
        method: 'post',
        type: 'form',
        config: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',

            cookie: 'JSESSIONID=1986apwbwia6vy21eiazu5rh8; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217a13800ad291b-06705f8463bb2c-4373266-1821369-17a13800ad3d55%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217a13800ad291b-06705f8463bb2c-4373266-1821369-17a13800ad3d55%22%7D; wps_domain=sf-express.com; csrf=RcESdN5JPAtkh8xF56eK4FeracjS3Qjd; route=56c4e3c87ad9257acee02fbe59070975; tlb-518g3rdj-6717=850d78a99d52a79a3f21de213c65abf1; locale=zh_CN_CN; tgw_l7_route=78aee55af23e5df67e44b15275d0eecd',
        },
    },
};
export default generator(Api);
