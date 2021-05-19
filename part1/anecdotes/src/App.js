import React, { useState } from 'react';

const DisplayTitle = ({ title }) => <h1>{title}</h1>;

const DisplayContent = ({ anecdote, point }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {point} votes</p>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const getRandomAnecdoteIndex = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const increaseVote = () => {
    const copyPoints = [...points];
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  };

  const findMostVotes = () => {
    const mostVotesIndex = points.indexOf(Math.max(...points));
    return mostVotesIndex;
  };

  return (
    <div>
      <DisplayTitle title="Anecdote of the day" />
      <DisplayContent anecdote={anecdotes[selected]} point={points[selected]} />
      <Button handleClick={increaseVote} text="vote" />
      <Button handleClick={getRandomAnecdoteIndex} text="next anecdote" />
      <DisplayTitle title="Anecdote with most votes" />
      <DisplayContent
        anecdote={anecdotes[findMostVotes()]}
        point={points[findMostVotes()]}
      />
    </div>
  );
};

export default App;
