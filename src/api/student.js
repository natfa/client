import { apiRoute } from '../constants';

const studentApiRoute = `${apiRoute}/student`;

async function getStudent() {
  const url = studentApiRoute;

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
  getStudent,
};
