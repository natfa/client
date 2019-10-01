let route;

const createOne = async (email, password, isAdmin) => {
  const data = { email, password, isAdmin }

  const response = await fetch(`${route}/create`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return {
    success: response.ok,
    data: await response.json(),
  }
}

export default r => {
  route = r
  return {
    createOne,
  }
}