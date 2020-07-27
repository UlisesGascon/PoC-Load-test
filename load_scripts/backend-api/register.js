import { check } from 'k6';
import http from 'k6/http';
import faker from "cdnjs.com/libraries/Faker";


export default function () {
  const url = `${__ENV.BACKEND_BASE_URL}/register`;
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const payload = JSON.stringify({
    email: `${firstName}_${lastName}_${faker.random.number(100)}@email.com`,
    password: faker.internet.password(20),
    lastName,
    firstName,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    '[POST] /register (200)': (r) => r.status === 200,
  });
};
