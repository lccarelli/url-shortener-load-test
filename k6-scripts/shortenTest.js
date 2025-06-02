import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 100, // 1000
    iterations: 500, // 50000
    thresholds: {
        http_req_duration: ['p(95)<3000'],
        http_req_failed: ['rate<0.02'],
    },
    http: {
        keepAlive: true,
        timeout: '60s',
    },
};

const hosts = ['http://192.168.0.164:8080'];

const params = {
    headers: { 'Content-Type': 'application/json' },
};

export default function () {
    const h = hosts[__VU % hosts.length];
    const uniqueUrl = `https://meli.com/test-${__VU}-${__ITER}`;
    const payload = JSON.stringify({ url: uniqueUrl });

    const res = http.post(`${h}/shorten`, payload, params);

    check(res, {
        'status is >= 200 && < 300': r => r.status >= 200 && r.status < 300,
    });

    if (res.status >= 200 && res.status < 300) {
        try {
            const short = JSON.parse(res.body).short;
            console.log(short);
        } catch (e) {
            console.error(`Error parsing response: ${res.body}`);
        }
    }
}
