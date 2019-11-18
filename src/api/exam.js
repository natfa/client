import { apiRoute } from '../constants';

const examApiRoute = `${apiRoute}/exam`;

const compile = async (data) => {
  const response = await fetch(examApiRoute, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return {
    success: response.ok,
    data: await response.json(),
  };
};

export default {
  compile,
};
