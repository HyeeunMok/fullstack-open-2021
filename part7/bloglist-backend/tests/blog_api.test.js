const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
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

// POST
describe('POST /api/blogs', () => {
  let token;

  beforeAll(async () => {
    await User.deleteMany({});

    const newUser = await new User({
      username: 'New Tester',
      passwordHash: await bycrypt.hash('dskafjlevd', 10),
    }).save();

    const userForToken = { username: 'New Tester', id: newUser.id };
    token = jwt.sign(userForToken, process.env.SECRET);
    return token;
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New blog is added. test for 4.23',
      author: 'Jone Doe',
      url: 'https://testingmok.com',
      likes: 17,
      userId: '6111898a24277a216c84ad01',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
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

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('if content is missing, respond with 400 bad request', async () => {
    const newBlog = { userId: '6111898a24277a216c84ad01' };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

// DELETE
describe('DELETE /api/blogs', () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const newUser = await new User({
      username: 'New Tester',
      passwordHash: await bycrypt.hash('dskafjlevd', 10),
    }).save();

    const userForToken = { username: 'New Tester', id: newUser.id };
    token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: 'ex. 4.23 testing',
      author: 'Test User',
      url: 'https://testing.com',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200);

    return token;
  });

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    expect(blogsAtEnd).toHaveLength(0);
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

// UPDATE
describe('UPDATE /api/blogs', () => {
  let token;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const newUser = await new User({
      username: 'Update Tester',
      passwordHash: await bycrypt.hash('dskafjlevd', 10),
    }).save();

    const userForToken = { username: 'Update Tester', id: newUser.id };
    token = jwt.sign(userForToken, process.env.SECRET);
    await api.post('/api/users').send(newUser);

    return token;
  });

  test('succeeds with status 200 if id is valid', async () => {
    const newBlog = {
      title: 'testing update api',
      author: 'Update Tester',
      url: 'https://www.updatedURL.net',
      likes: 23,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // const initialBlogs = await helper.blogsInDb();
    const allBlogs = await helper.blogsInDb();
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title);
    // const updatedBlog = blogsAtEnd[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const testBlog = blogsAtEnd.find(blog => blog.likes === 24);

    expect(testBlog.likes).toBe(24);
    expect(testBlog.author).toBe('Update Tester');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
