import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(createAnecdote(content))
  };

  return (
    <form onSubmit={createNewAnecdote}>
      <div>
        <input name="content" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
