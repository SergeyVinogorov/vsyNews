const InitialState = {
  news: [],
}

const reducer = (state = InitialState, action) => {
  if (action.type === 'INCREMENT') {
    return
  }
  if (action.type === 'SET_NEWS') {
    return {
      ...state,
      news: state.news.concat(action.arr),
    }
  }
  return state
}

export default reducer
