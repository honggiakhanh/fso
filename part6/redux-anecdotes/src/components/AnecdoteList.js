import React from "react";
import { connect } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { setNotifications } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  return props.anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button
          onClick={() => {
            props.upvote(anecdote.id);
            props.setNotifications(anecdote.content, 5);
          }}
        >
          vote
        </button>
      </div>
    </div>
  ));
};

const mapStateToProps = (state) => {
  return { anecdotes: state.anecdote };
};

const mapDispatchToProps = {
  upvote,
  setNotifications,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
