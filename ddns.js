const https = require('https')
const crypto = require('crypto')
const { URL } = require('url')

const config = {
    rr: 'phone',
    domain: 'sinwai.cn',

    accessKeyId: 'LTAI5tNgM9wFm3iMJ36Qcg8n',
    accessKeySecret: '',

    mode: 'ipv6',
    interval: 3600,

    alidnsAPI: 'https://alidns.aliyuncs.com/',
    ip4Api: 'https://api.ipify.org/?format=json',
    ip6Api: 'https://api6.ipify.org?format=json'
}

/**
 * 原生 https.get 的简单包装
 * 
 * @param {string} url
 * @param {object} params 请求参数.
 * @param {object} options NodeJS request 选项.
 * @returns {Promise} 成功 resolve 响应正文，失败 reject 错误对象
 */
function get(url, params = {}, options = {}) {
    url = new URL(url)

    for (const [k, v] of Object.entries(params)) {
        url.searchParams.append(k, v)
    }
    Object.assign(options, {
        hostname: url.hostname,
        path: url.pathname + url.search
    })

    return new Promise((resolve, reject) => {
        const req = https.get(options, (resp) => {
            if (resp.statusCode !== 200) {
                reject(new Error('HTTP request error. HTTP status code: ' + resp.statusCode))
            }
            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                resolve(data)
            })
        })
        req.on('error', (e) => {
            reject(new Error('HTTP request error. Code: ' + e.code))
        })
        req.setTimeout(30 * 1000, () => {
            req.abort()
        })
    })
}

const { getIp4, getIp6 } = (function () {
    const ipv4RegExp = /^((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/
    const ipv6RegExp = new RegExp([
        '^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|',
        '([0-9a-fA-F]{1,4}:){1,7}:|',
        '([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|',
        '([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|',
        '([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|',
        '([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|',
        '([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|',
        '[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|',
        ':((:[0-9a-fA-F]{1,4}){1,7}|:)|',
        'fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|',
        '::(ffff(:0{1,4}){0,1}:){0,1}',
        '((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}',
        '(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|',
        '([0-9a-fA-F]{1,4}:){1,4}:',
        '((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}',
        '(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$'
    ].join(''))

    async function getIp(family, ipApi, regexp) {
        const request = await get(ipApi, undefined, { family: family })

        try {
            var data = JSON.parse(request).ip
            if (typeof (data) !== 'string' || !regexp.test(data)) {
                throw new Error()
            }
        } catch (e) {
            throw new Error(`Get IP fail. Can't parse server respone.`)
        }

        return data
    }

    return {
        /**
         * 获取公网 IPv4 地址
         * @returns 成功则 resolve IP 字符串，失败则 reject 错误对象
         */
        getIp4: () => getIp(4, config.ip4Api, ipv4RegExp),
        getIp6: () => getIp(6, config.ip6Api, ipv6RegExp)
    }
})()

const { getRecord4, getRecord6, addRecord4, addRecord6, updateRecord4, updateRecord6 } = (function () {
    // 将公共参数和签名附加到请求参数
    function attachParam(specParam) {
        function percentEncode(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))
        }

        function makeSignature(parames) {
            const magicPrefix = 'GET&%2F&'
            const magicKeyPostfix = '&'

            const canonicalizedQueryString = Object.keys(parames)
                .sort()
                .map(k => percentEncode(k) + '=' + percentEncode(parames[k]))
                .join('&')

            const data = magicPrefix + percentEncode(canonicalizedQueryString)
            const key = config.accessKeySecret + magicKeyPostfix

            return crypto.createHmac('sha1', key).update(data).digest('base64')
        }

        let parames = Object.assign({
            'Format': 'JSON',
            'Version': '2015-01-09',
            'AccessKeyId': config.accessKeyId,
            'SignatureMethod': 'HMAC-SHA1',
            'SignatureVersion': '1.0',
            'SignatureNonce': crypto.randomBytes(16).toString('hex'),
            'Timestamp': (new Date()).toISOString(),
        }, specParam)

        return Object.assign(parames, { 'Signature': makeSignature(parames) })
    }

    // 获取解析记录
    async function getRecord(type) {
        const request = await get(config.alidnsAPI, attachParam({
            'Action': 'DescribeSubDomainRecords',
            'SubDomain': config.rr + '.' + config.domain,
            'Type': type
        }))

        try {
            var data = JSON.parse(request)
        } catch (e) {
            throw new Error(`Query record fail. Can't parse server respone.`)
        }

        if (data.TotalCount !== 1 && data.TotalCount !== 0) {
            throw new Error(`Query record fail. ${data.Code ? 'Code: ' + data.Code : ''}`)
        }

        return data.TotalCount ? data.DomainRecords.Record[0] : null
    }

    // 修改（更新、新增）解析记录
    async function changeRecord(ip, recordId, type) {
        let parame = {
            'RR': config.rr,
            'Value': ip,
            'Type': type,
            'Action': recordId ? 'UpdateDomainRecord' : 'AddDomainRecord'
        }
        Object.assign(parame, recordId ? { 'RecordId': recordId } : { 'DomainName': config.domain })

        let request = await get(config.alidnsAPI, attachParam(parame))
        try {
            var data = JSON.parse(request)
        } catch (e) {
            throw new Error(`Update record fail. Can't parse server respone.`)
        }

        if (!data.RecordId) {
            throw new Error(`Update record fail. ${data.Code ? 'Code: ' + data.Code : ''}`)
        }

        return data
    }

    return {
        /**
         * 获取域名当前解析记录
         * @returns 成功则 resolve 解析记录，失败则 reject 错误对象
         */
        getRecord4: () => getRecord('A'),
        getRecord6: () => getRecord('AAAA'),
        /**
         * 为域名添加一条解析记录
         * @param ip 新的 IP 地址
         * @returns 成功则 resolve 接口的响应数据，失败则 reject 错误对象
         */
        addRecord4: (ip) => changeRecord(ip, 0, 'A'),
        addRecord6: (ip) => changeRecord(ip, 0, 'AAAA'),
        /**
         * 更新域名的解析记录
         * @param ip 新的 IP 地址
         * @param recordId 旧的解析记录 ID
         * @returns 成功则 resolve 接口的响应数据，失败则 reject 错误对象
         */
        updateRecord4: (ip, recordId) => changeRecord(ip, recordId, 'A'),
        updateRecord6: (ip, recordId) => changeRecord(ip, recordId, 'AAAA')
    }
})()

async function start() {
    let ip4, ip6

    if (config.mode === 'both' || config.mode === 'ipv4') {
        try {
            ip4 = await getIp4()
        } catch (e) {
            console.log(`(Warning) Can't query IPv4 address, skip. Reason: ${e.message}`)
        }
    }

    if (ip4) {
        try {
            const record = await getRecord4()
            if (record && record.Value === ip4) {
                console.log(`(No change) (IPv4) ${config.rr}.${config.domain} ${ip4}`)
            } else if (record && record.Value !== ip4) {
                await updateRecord4(ip4, record.RecordId)
                console.log(`(Updated) (IPv4) ${config.rr}.${config.domain} ${record.Value} -> ${ip4}`)
            } else {
                await addRecord4(ip4)
                console.log(`(Added) (IPv4) ${config.rr}.${config.domain} ${ip4}`)
            }
        } catch (e) {
            console.log(`(Error) ${e.message}`)
        }
    }

    if (config.mode === 'both' || config.mode === 'ipv6') {
        try {
            ip6 = await getIp6()
        } catch (e) {
            console.log(`(Warning) Can't query IPv6 address, skip. Reason: ${e.message}`)
        }
    }

    if (ip6) {
        try {
            const record = await getRecord6()
            if (record && record.Value === ip6) {
                console.log(`(No change) (IPv6) ${config.rr}.${config.domain} ${ip6}`)
            } else if (record && record.Value !== ip6) {
                await updateRecord6(ip6, record.RecordId)
                console.log(`(Updated) (IPv6) ${config.rr}.${config.domain} ${record.Value} -> ${ip6}`)
            } else {
                await addRecord6(ip6)
                console.log(`(Added) (IPv6) ${config.rr}.${config.domain} ${ip6}`)
            }
        } catch (e) {
            console.log(`(Error) ${e.message}`)
        }
    }
}

if (config.interval) {
    setInterval(start, config.interval * 1000)
}

start()