import { apiRoute } from '../constants';

const specialtyApiRoute = `${apiRoute}/specialty`;

async function getAllSpecialties() {
  const request = await fetch(specialtyApiRoute, {
    method: 'GET',
    credentials: 'include',
  });

  if (!request.ok) {
    console.error(await request.text());
    return null;
  }

  return request.json();
}

export default {
  getAllSpecialties,
};
