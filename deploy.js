const {exec} = require('child_process');

const task = () => {
    exec('tar -C dist -czf app.tar.gz * &&'
        + 'scp app.tar.gz root@47.116.42.80:tmp/ &&'
        // + 'ssh root@47.116.42.80 "cd /usr/share/nginx/html && rm -rf * && tar -zxf ~/tmp/app.tar.gz"',
        + 'ssh root@47.116.42.80 "cd /var/www/html/ && rm -rf * && tar -zxf ~/tmp/app.tar.gz"',
         (err, stdout, stderr) => {
        if (err) throw err;
        console.log(stdout);
        console.error(stderr);
    });
};
task();
