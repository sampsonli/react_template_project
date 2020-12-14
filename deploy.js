const {exec} = require('child_process');

const task = () => {
    exec('tar -C dist -czf app.tar.gz * &&'
        + 'scp app.tar.gz root@111.231.188.160:tmp/ &&'
        + 'ssh root@111.231.188.160 "cd /usr/share/nginx/html && rm -rf * && tar -zxf ~/tmp/app.tar.gz"',
         (err, stdout, stderr) => {
        if (err) throw err;
        console.log(stdout);
        console.error(stderr);
    });
};
task();
