import { apiRoute } from '../constants';

const mediaApiRoute = `${apiRoute}/media`;

const getManyByQuestionId = async (questionId) => {
  const response = await fetch(`${mediaApiRoute}/${questionId}`, {
    method: 'GET',
    credentials: 'include',
  });

  return {
    success: response.ok,
    data: await response.json(),
  };
};

export default {
  getManyByQuestionId,
};
