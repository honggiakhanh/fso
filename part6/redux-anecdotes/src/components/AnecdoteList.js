import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { createNoti, deleteNoti } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);
  const vote = (id) => {
    dispatch(upvote(id));
  };
  const noti = (content) => {
    dispatch(createNoti(content));
    setTimeout(() => dispatch(deleteNoti()), 5000);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button
          onClick={() => {
            vote(anecdote.id);
            noti(anecdote.content);
          }}
        >
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
