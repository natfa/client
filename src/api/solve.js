import { apiRoute } from '../constants';

const solveApiRoute = `${apiRoute}/solve`;

const getExamById = async (id) => {
  const response = await fetch(`${solveApiRoute}/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

const answerQuestion = async (questionId, answerId) => {
  const response = await fetch(`${solveApiRoute}/answer`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionId, answerId }),
  });

  return response.ok;
};

const submitExam = async (solution) => {
  const response = await fetch(`${solveApiRoute}/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(solution),
  });

  return response.ok;
};

export default {
  getExamById,
  answerQuestion,
  submitExam,
};
