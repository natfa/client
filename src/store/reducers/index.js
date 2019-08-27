import {
  CHANGE_PAGE,
  POPULATE,
} from '../actions'

import pages from '../pages'

const initialState = {
  page: pages.TESTS_VIEW,
  test: null,
}

function app(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        page: page(state.page, action),
      })
    case POPULATE:
      return Object.assign({}, state, {
        test: test(state.test, action),
      })
    default:
      return state
  }
}

function test(state = null, action) {
  switch (action.type) {
    case POPULATE:
      return Object.assign({}, {
        name: action.data.name,
        questions: action.data.questions,
        start: action.data.start,
        end: action.data.end,
        timeToSolve: action.data.timeToSolve,
      })
    default:
      return state
  }
}

function page(state = null, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.page
    default:
      return state;
  }
}

export default app
