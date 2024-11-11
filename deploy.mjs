// const {exec} = require('child_process');

import {exec} from 'child_process';


const task = async () => {

    await exeCmd('tar -C dist -czf app.tar.gz *');
    await exeCmd('scp app.tar.gz root@47.116.42.80:tmp/');
    await exeCmd('ssh root@47.116.42.80 "cd /var/www/html/ && rm -rf * && tar -zxf ~/tmp/app.tar.gz"');
};
task().then(() => {});


/**
 *
 * @param cmd {string}
 * @returns {Promise<unknown>}
 */
function exeCmd(cmd){
    return new Promise((resolve, reject) => {
        exec(cmd,
            (err) => {
                if (err) {
                    console.error(`error: ${cmd}`);
                    return reject(err);
                }
                console.log(`finished: ${cmd}`);
                resolve();
            });
    });
}

