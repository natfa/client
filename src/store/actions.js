export const CHANGE_PAGE = 'CHANGE_PAGE'
export const POPULATE = 'POPULATE'

export const changePage = (page) => {
  return {
    type: CHANGE_PAGE,
    page,
  }
}

export const populate = (data) => {
  return {
    type: POPULATE,
    data,
  }
}
