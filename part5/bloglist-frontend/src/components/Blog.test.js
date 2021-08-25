import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
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

  let component;
  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test('renders blogs with only title and author', () => {
    expect(component.container).toHaveTextContent('Climate Change');
    expect(component.container).toHaveTextContent('John Doe');
    expect(component.container.likes).toBeUndefined;
    expect(component.container.url).toBeUndefined;
  });

  test('renders blogs with all details when View button is clicked', () => {
    const button = component.getByText('View');
    fireEvent.click(button);

    const blogDetails = component.container.querySelector('.blogDetails');
    expect(blogDetails).toBeVisible();
    expect(blogDetails).toHaveTextContent(blog.likes);
    expect(blogDetails).toHaveTextContent(blog.url);
  });
});
