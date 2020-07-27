import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const url = `${__ENV.BACKEND_BASE_URL}/login`;
  const payload = JSON.stringify({
    email: __ENV.USER_EMAIL,
    password: __ENV.USER_PASS
});

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    '[POST] /login (200)': (r) => r.status === 200,
  });
};
