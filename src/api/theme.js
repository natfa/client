import { apiRoute } from '../constants';

const themeApiRoute = `${apiRoute}/theme`;

export const getAll = async () => {
  const response = await fetch(themeApiRoute, {
    method: 'GET',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};

export const getAllBySubjectId = async (subjectId) => {
  const response = await fetch(`${themeApiRoute}/${subjectId}`, {
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
  getAllBySubjectId,
};
