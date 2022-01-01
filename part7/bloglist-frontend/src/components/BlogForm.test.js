import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlogMockHandler = jest.fn();
  const component = render(<BlogForm createBlog={createBlogMockHandler} />);

  const titleInput = component.container.querySelector('#title');
  const authorInput = component.container.querySelector('#author');
  const urlInput = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, { target: { value: 'React testing' } });
  fireEvent.change(authorInput, { target: { value: 'Jane Doe' } });
  fireEvent.change(urlInput, { target: { value: 'https://react-testing.ca' } });
  fireEvent.submit(form);

  expect(createBlogMockHandler.mock.calls).toHaveLength(1);
  expect(createBlogMockHandler.mock.calls[0][0].title).toBe('React testing');
  expect(createBlogMockHandler.mock.calls[0][0].author).toBe('Jane Doe');
  expect(createBlogMockHandler.mock.calls[0][0].url).toBe(
    'https://react-testing.ca'
  );
});
