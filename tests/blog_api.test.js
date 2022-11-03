const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlog);
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs');
  const firstItem = response.body[0];

  expect(firstItem).toBeDefined();
  expect(Object.keys(firstItem)).toContain('id');
});

test('a valid new blog post can be added', async () => {
  const newBlog = {
    title: 'All new blog post',
    author: 'Abdillah',
    url: 'abd.io/awesome-blog',
    likes: 7,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogAtEnd = await api.get('/api/blogs');
  expect(blogAtEnd.body).toHaveLength(helper.initialBlog.length + 1);
  expect(blogAtEnd.body.map((b) => b.title)).toContain('All new blog post');
});

test('missing value likes property is default to 0', async () => {
  const newBlog = {
    title: 'Blog post without likes',
    author: 'Irfaan Again',
    url: 'faan.cool/awesome-blog',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogAtEnd = await api.get('/api/blogs');
  expect(blogAtEnd.body[helper.initialBlog.length].likes).toBe(0);
});

test('blog without title or url is not added', async () => {
  const newBlogWithNoTitle = {
    author: 'Fath Cool',
    url: 'fathul.ai/cool-blog',
  };
  const newBlogWithNoURL = {
    title: 'There is no url',
    author: 'Fath Cool',
  };

  await api.post('/api/blogs').send(newBlogWithNoTitle).expect(400);
  await api.post('/api/blogs').send(newBlogWithNoURL).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
