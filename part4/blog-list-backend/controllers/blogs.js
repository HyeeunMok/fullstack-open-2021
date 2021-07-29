const Blog = require('../models/blog');
const blogsRouter = require('express').Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
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

module.exports = blogsRouter;
