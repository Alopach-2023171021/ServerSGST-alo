import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.1'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const res = http.get('http://localhost:5000');
  check(res, {
    'status is 200 or 404': (r) => r.status === 200 || r.status === 404,
  });
  sleep(1);
}
