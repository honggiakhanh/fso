let timeoutID

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

export const setNotifications = (content, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({type: "CREATE_NOTI", text: content})
    timeoutID = setTimeout(() => {
      console.log('in')
      dispatch({type: "DELETE_NOTI", text: 'Vote your favourite anecdote!'})
    }, time*1000);
  }
}

export default reducer
