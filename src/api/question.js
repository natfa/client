import { apiRoute } from '../constants';

const questionApiRoute = `${apiRoute}/question`;

export const createOne = async (data) => {
  // let the fetch function decide on the content type itself
  // since if you put the content type yourself
  // the multipart/form-data bountry won't be set correctly
  const response = await fetch(questionApiRoute, {
    method: 'POST',
    credentials: 'include',
    body: data,
  });

  return {
    success: response.ok,
    data: await response.text(),
  };
};

export const getAll = async () => {
  const response = await fetch(questionApiRoute, {
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
  createOne,
  getAll,
};

/*

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
*/
