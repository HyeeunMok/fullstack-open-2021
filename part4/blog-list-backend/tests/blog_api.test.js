const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogs.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);
    expect(titles).toContain('Go To Statement Considered Harmful');
  });

  test('blogs should have a property named id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New blog is added',
      author: 'Test Mok',
      url: 'https://testingmok.com',
      likes: 17,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  // test('If the likes property is missing, it will default to the value 0', async () => {
  //   const newBlog = {
  //     title: 'New blog is added without likes',
  //     author: 'John Doe',
  //     url: 'https://testing.com',
  //   };

  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(201)
  //     .expect('Content-Type', /application\/json/);

  //   const { body: blogs } = await api.get('/api/blogs');
  //   expect(blogs[blogs.length - 1].likes).toEqual(0);
  // });
  test('If the likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'New blog is added without likes',
      author: 'John Doe',
      url: 'https://testing.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const likesOfAddedBlog = blogsAtEnd[blogsAtEnd.length - 1].likes;
    expect(likesOfAddedBlog).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
