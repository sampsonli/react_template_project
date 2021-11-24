/** postcss-loader 解析器所需的配置文件 * */
// eslint-disable-next-line import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer');
// eslint-disable-next-line import/no-extraneous-dependencies
const pxtorem = require('postcss-pxtorem');

module.exports = {
    plugins: [
      autoprefixer,
        pxtorem({
            replace: true,
            propList: ['*'],
            rootValue: 100,
        }),
    ],
};
