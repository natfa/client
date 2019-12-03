import { apiRoute } from '../constants';

const mediaApiRoute = `${apiRoute}/media`;

const getManyByQuestionId = async (questionId) => {
  const response = await fetch(`${mediaApiRoute}/${questionId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export default {
  getManyByQuestionId,
};
