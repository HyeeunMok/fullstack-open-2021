const Blog = require('../models/blog');
const logger = require('../utils/logger');
const blogsRouter = require('express').Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  blog ? response.json(blog.toJSON()) : response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const existId = await Blog.findByIdAndDelete(request.params.id);
  existId ? response.status(204).end() : response.status(404).end();
});

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
