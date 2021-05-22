import React from 'react';

const Header = () => <h1>Web development curriculum</h1>;

const Title = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ parts }) => {
  return parts.map(part => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));
};

const Content = ({ course }) => {
  return (
    <div>
      <Part parts={course.parts} />
    </div>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ courses }) => {
  return courses.map(course => (
    <div key={course.id}>
      <Title course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  ));
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Header />
      <Course courses={courses} />
    </div>
  );
};

export default App;
