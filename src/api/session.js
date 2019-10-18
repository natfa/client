import { apiRoute } from '../constants';

const sessionApiRoute = `${apiRoute}/auth`;

export const authenticate = async (email, password) => {
  const loginData = { email, password };

  const response = await fetch(sessionApiRoute, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    return null;
  }

  const account = await response.json();
  return account;
};

export const getActiveSession = async () => {
  const response = await fetch(sessionApiRoute, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  const account = await response.json();
  return account;
};

export default {
  authenticate,
  getActiveSession,
};
