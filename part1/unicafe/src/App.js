import React, { useState } from 'react';

const DisplayTitle = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

const Statistics = (props) => {
  if (props.text !== 'average' && props.score === 0) {
    return <div>No feedback given</div>;
  }
  if (props.text === 'average' && isNaN(props.score)) {
    return (
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    );
  }
  if (props.text === 'positive' && props.score === 'NaN %') {
    return (
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>0 %</td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: 50 }}>{props.text}</td>
          <td>{props.score}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good * 100) / all;

  return (
    <div>
      <DisplayTitle title="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <DisplayTitle title="statistics" />
      <Statistics text="good" score={good} />
      <Statistics text="neutral" score={neutral} />
      <Statistics text="bad" score={bad} />
      <Statistics text="all" score={all} />
      <Statistics text="average" score={average} />
      <Statistics text="positive" score={`${positive} %`} />
    </div>
  );
};

export default App;
