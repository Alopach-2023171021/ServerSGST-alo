import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.5'],
    http_req_duration: ['p(95)<3000'],
  },
};

export default function () {
  const res = http.get('http://34.51.97.115:5000');
  check(res, {
    'status is not 0': (r) => r.status !== 0,
  });
  sleep(1);
}
