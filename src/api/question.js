import { apiRoute } from '../constants';

const questionApiRoute = `${apiRoute}/question`;

export const createOne = async (data) => {
  // let the fetch function decide on the content type itself
  // since if you put the content type yourself
  // the multipart/form-data bountry won't be set correctly
  const response = await fetch(questionApiRoute, {
    method: 'POST',
    body: data,
  });

  return {
    success: response.ok,
    data: await response.json(),
  };
};

export const getAll = async () => {
  const response = await fetch(questionApiRoute, {
    method: 'GET',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export const getOneById = async (id) => {
  const response = await fetch(`${questionApiRoute}/${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

const updateOne = async (data) => {
  // let the fetch function decide on the content type itself
  // since if you put the content type yourself
  // the multipart/form-data bountry won't be set correctly
  const response = await fetch(questionApiRoute, {
    method: 'PUT',
    body: data,
  });

  return {
    success: response.ok,
    data: await response.json(),
  };
};

export const deleteOneById = async (id) => {
  const response = await fetch(`${questionApiRoute}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return false;
  }
  return true;
};

export default {
  createOne,
  getAll,
  getOneById,
  updateOne,
  deleteOneById,
};
