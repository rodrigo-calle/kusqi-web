import { LoginType } from '../types';

const URL_BASE = 'http://localhost:8080'

const loginAccount = ({ email, password }: LoginType) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${URL_BASE}/auth/local/login`, payload);
};

const auth = {
  loginAccount,
  // confirmAccount,
  // forgotPassword,
};

export default auth