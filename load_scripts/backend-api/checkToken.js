import { check } from 'k6';
import http from 'k6/http';

export function setup() {
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

  const loginRes = http.post(url, payload, params);
  let authToken = loginRes.json('token');
  //@optional: check(authToken, { 'logged in successfully': () => authToken !== '', });
  return authToken;
}


export default function (jwt) {
  const url = `${__ENV.BACKEND_BASE_URL}/checkToken`;

  const params = {
    headers: {
      'Authorization': `bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(url, params);
  check(res, {
    '[GET] /checkToken (200)': (r) => r.status === 200,
  });
};
