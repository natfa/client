let route

const authenticate = async (email, password) => {
  const data = { email, password }
    
  const response = await fetch(route, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok)
    return false
  return await response.json()
}

const getActiveSession = async () => {
  const response = await fetch(route, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })

  if (!response.ok)
    return null
  return await response.json()
}

export default r => {
  route = r
  return {
    authenticate,
    getActiveSession,
  }
}