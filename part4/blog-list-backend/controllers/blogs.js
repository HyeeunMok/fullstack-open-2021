const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
const blogsRouter = require('express').Router();

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map(blog => blog.toJSON()));
});

// Get one blog based on id
blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  blog ? response.json(blog.toJSON()) : response.status(404).end();
});

// Add new blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  const populatedBlog = await savedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate();
  response.status(200).json(populatedBlog.toJSON());
});

// Delete a blog based on id
blogsRouter.delete('/:id', async (request, response) => {
  const existId = await Blog.findByIdAndRemove(request.params.id);
  existId ? response.status(204).end() : response.status(404).end();
});

// Update a blog based on id
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  updatedBlog
    ? response.status(200).json(updatedBlog.toJSON())
    : response.status(404).end();
});

module.exports = blogsRouter;
