import { apiRoute } from '../constants';

const themeApiRoute = `${apiRoute}/theme`;

export const getAll = async () => {
  const response = await fetch(themeApiRoute, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
};

export const getAllBySubjectid = async (subjectid) => {
  const response = await fetch(`${themeApiRoute}/${subjectid}`, {
    method: 'GET',
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
  getAllBySubjectid,
};
