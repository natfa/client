import { apiRoute } from '../constants';

const subjectApiRoute = `${apiRoute}/subject`;

export const getAll = async () => {
  const response = await fetch(subjectApiRoute, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
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
