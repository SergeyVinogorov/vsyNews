const user = JSON.parse(localStorage.getItem('user'));

const InitialState = {
  breaking: [],
  tech: [],
  loading: false,
  user: {},
  loggedIn: false
}

const reducer = (state = InitialState, action) => {
  if (action.type === 'SET_BREAKING_NEWS') {
    return {
      ...state,
      breaking: state.breaking.concat(action.arr),
    }
  }
  if (action.type === 'SET_TECH_NEWS') {
    return {
      ...state,
      tech: state.tech.concat(action.arr),
    }
  }
  if (action.type === 'SET_LOADING') {
    const load = action.statement
    return {
      ...state,
      loading: load
    }
  }

  if (action.type === 'LOGIN_SUCCESS') {
    return {
      ...state,
      loggedIn: true,
      user: action.user
    }
  }
  if (action.type === 'LOGIN_FAILURE') {
    return {
      ...state,
      loggedIn: false,
      user: {}
    }
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      loggedIn: false,
      user: {}
    }
  }
  return state
}

export default reducer
