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
      author: 'Jone Doe',
      url: 'https://testingmok.com',
      likes: 17,
      userId: '6111898a24277a216c84ad01',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('If the likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'New blog is added without likes',
      author: 'John Doe',
      url: 'https://testing.com',
      userId: '6111898a24277a216c84ad01',
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

  test('If title and url are missing, respond with 400 bad request', async () => {
    const newBlog = {
      author: 'Jone Doe',
      likes: 12,
      userId: '6111898a24277a216c84ad01',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('if content is missing, respond with 400 bad request', async () => {
    const newBlog = { userId: '6111898a24277a216c84ad01' };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('DELETE /api/blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    expect(blogsAtEnd).not.toContain(blogToDelete.id);
  });

  test('respond with 404 when trying to delete the blog using non-existing id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const noIdBlog = await helper.nonExistingId();
    await api.delete(`/api/blogs/${noIdBlog}`).expect(404);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

describe('UPDATE /api/blogs', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const newBlog = {
      title: 'testing update api',
      author: 'Test Doe',
      url: 'https://www.updatedURL.net',
      likes: 23,
    };

    const initialBlogs = await helper.blogsInDb();
    const blogToUpdate = initialBlogs[0];
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const updatedBlog = blogsAtEnd[0];

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(updatedBlog.likes).toBe(23);
    expect(updatedBlog.author).toBe('Test Doe');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
