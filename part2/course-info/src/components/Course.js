import React from 'react';

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

export default Course;
