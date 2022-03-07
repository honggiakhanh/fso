import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    const NewAnec = await anecService.createNew(content)
    dispatch(createAnecdote(NewAnec))
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
