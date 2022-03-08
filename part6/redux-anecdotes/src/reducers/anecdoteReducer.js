import anecdotesService from "../services/anecdotes"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANEC":
      return action.data;
    case "UPVOTE":
      return state.map((a) => (a.id !== action.data.id ? a : action.data));
    case "NEW_ANEC":
      return [...state, action.data];
    default:
      return state;
  }
};

export const upvote = ( id ) => {
  return async dispatch => {
    console.log('upvote')
    const upvotedAnecdotes = await anecdotesService.upvote(id)
    console.log(upvotedAnecdotes)
    dispatch({type: "UPVOTE", data: upvotedAnecdotes})
  }
};

export const createAnecdote = (anec) => {
  return async dispatch => {
    console.log('create')
    const newAnecdote = await anecdotesService.createNew(anec)
    console.log(newAnecdote)
    dispatch({type: "NEW_ANEC", data: newAnecdote})
  }
};

export const initAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await anecdotesService.getAll()
    dispatch({type: "INIT_ANEC", data: initialAnecdotes})
  }
};

export default reducer;
