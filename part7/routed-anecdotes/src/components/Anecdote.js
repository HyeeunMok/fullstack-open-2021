import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find(anecdote => anecdote.id === id);
  return (
    <div>
      <h2>{anecdote.author}</h2>
      <div>{anecdote.content}</div>
      <div>
        For more info, see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
      <div>has {anecdote.votes} votes</div>
    </div>
  );
};

export default Anecdote;
