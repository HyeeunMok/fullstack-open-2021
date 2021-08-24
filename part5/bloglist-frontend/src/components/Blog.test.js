import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders blogs with only title and author', () => {
  const blog = {
    title: 'Climate Change',
    author: 'John Doe',
    url: 'https://climate-change.ca',
    likes: 33,
    user: {
      username: 'mike',
      name: 'Mike Arsenault',
    },
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent('Climate Change');
  expect(component.container).toHaveTextContent('John Doe');
  expect(component.container.likes).toBeUndefined;
  expect(component.container.url).toBeUndefined;
});
