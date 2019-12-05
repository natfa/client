import { apiRoute } from '../constants';

const courseApiRoute = `${apiRoute}/course`;

async function getAllCourses() {
  const request = await fetch(courseApiRoute, {
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
  getAllCourses,
};
