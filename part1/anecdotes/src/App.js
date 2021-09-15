import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({anecdotes, selected}) => {
  return(
    <div>
      {anecdotes[selected]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdotes = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const voteAnecdotes = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const i = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected}/>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={voteAnecdotes} text="Vote"/>
      <Button handleClick={randomAnecdotes} text="Next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} selected={i}/>
      <p>has {votes[i]} votes</p>
    </div>
  )
}

export default App