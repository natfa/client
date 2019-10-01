let route

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

const getAllBySubjectid = async subjectid => {
  const response = await fetch(`${route}/${subjectid}`, {
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
    getAll,
    getAllBySubjectid,
  }
}
