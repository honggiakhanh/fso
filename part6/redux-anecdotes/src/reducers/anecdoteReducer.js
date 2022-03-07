const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANEC":
      return action.data;
    case "UPVOTE":
      const id = action.data.id;
      const anecdoteToUpvote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToUpvote,
        votes: Number(anecdoteToUpvote.votes) + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    case "NEW_ANEC":
      return [...state, action.data];
    default:
      return state;
  }
};

export const upvote = ( id ) => {
  return {
    type: "UPVOTE",
    data: { id },
  };
};

export const createAnecdote = ( anec ) => {
  return {
    type: "NEW_ANEC",
    data: anec ,
  };
};

export const initAnecdotes = ( anecs ) => {
  return {
    type: "INIT_ANEC",
    data: anecs,
  };
};

export default reducer;
