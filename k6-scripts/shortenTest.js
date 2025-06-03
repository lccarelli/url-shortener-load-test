import http from 'k6/http';
import { check } from 'k6';

const VUS = __ENV.VUS ? parseInt(__ENV.VUS) : 100;
const ITERATIONS = __ENV.ITERATIONS ? parseInt(__ENV.ITERATIONS) : 500;
const HOST = __ENV.HOST || 'http://shortener1:8080';

export const options = {
    vus: VUS,
    iterations: ITERATIONS,
    thresholds: {
        http_req_duration: ['p(99)<1000'],
        http_req_failed: ['rate<0.02'],
    },
    http: {
        keepAlive: true,
        timeout: '60s',
    },
};

const params = {
    headers: { 'Content-Type': 'application/json' },
};

export default function () {
    const uniqueUrl = `https://meli.com/test-${__VU}-${__ITER}`;
    const payload = JSON.stringify({ url: uniqueUrl });

    const res = http.post(`${HOST}/shorten`, payload, params);

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
