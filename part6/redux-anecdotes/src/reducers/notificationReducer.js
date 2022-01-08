const reducer = (state = 'Vote your favourite anecdote!', action) => {
  switch (action.type) {
    case "CREATE_NOTI":
      return action.text;
    case "DELETE_NOTI":
      return action.text;
    default:
      return state;
  }
};

export const createNoti = (content) => {
  return {
    type: "CREATE_NOTI",
    text: `Voted for: ${content}`
  }
}

export const deleteNoti = () => {
  return {
    type: "DELETE_NOTI",
    text: 'Vote your favourite anecdote!'
  }
}

export default reducer
