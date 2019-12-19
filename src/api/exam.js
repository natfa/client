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

const getAll = async () => {
  const response = await fetch(examApiRoute, {
    method: 'GET',
    credentials: 'include',
  });

  return response.json();
};

async function getStudentExamResults(examId, studentId) {
  const url = `${examApiRoute}/${examId}/results/${studentId}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    console.error(response);
    console.error(await response.text());
    return null;
  }

  return response.json();
}

export default {
  compile,
  getOneById,
  getAll,
  getStudentExamResults,
};
