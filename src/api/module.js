import { apiRoute } from '../constants';

const moduleApiRoute = `${apiRoute}/module`;

export const getAll = async () => {
  const response = await fetch(moduleApiRoute, {
    method: 'GET',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};

export default {
  getAll,
};
