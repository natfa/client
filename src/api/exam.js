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

const getOneById = async (id) => {
  const response = await fetch(`${examApiRoute}/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  return {
    success: response.ok,
    data: await response.json(),
  };
};

export default {
  compile,
  getOneById,
};
