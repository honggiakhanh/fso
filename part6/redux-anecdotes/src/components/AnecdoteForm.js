import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {

  const createNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    props.createAnecdote(content)
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

const mapDispatchToProps = {
  createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm;
