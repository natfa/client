import { apiRoute } from '../constants';

const questionApiRoute = `${apiRoute}/question`;

export const createOne = async (data) => {
  const response = await fetch(questionApiRoute, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  return {
    success: response.ok,
    data: await response.text(),
  };
};

export default {
  createOne,
};

/*
const getAll = async () => {
  const response = await fetch(route, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })

  if (!response.ok)
    return null

  return await response.json()
}

const getBySubjectid = async subjectid => {
  const response = await fetch(`${route}/filter/${subjectid}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })

  if (!response.ok)
    return null

  return await response.json()
}

const getById = async id => {
  const response = await fetch(`${route}/${id}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })

  if (!response.ok)
    return null

  return await response.json()
}

const deleteById = async id => {
  const response = await fetch(`${route}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
  })

  if (!response.ok)
    return false
  return true
}

export default r => {
  route = r

  return {
    getAll,
    getBySubjectid,
    getById,
    createOne,
    deleteById,
  }
}
*/