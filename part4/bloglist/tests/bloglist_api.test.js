const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index.js");
const api = supertest(app);

const helper = require("./test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs list are returned as the correct length", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs have an existing id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  const firstBlog = response.body[0];
  expect(firstBlog.id).toBeDefined();
});

test("new blogs added successfully", async () => {
  const newBlog = {
    title: "test3",
    author: "test3",
    url: "test3",
    likes: 7,
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const newBlogs = await helper.getBlogs();
  expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1);
});

test("no likes defaults to 0", async () => {
  const zeroLikeBlog = {
    title: "test0",
    author: "test0",
    url: "test0",
  };

  await api.post("/api/blogs").send(zeroLikeBlog).expect(201);

  const newBlogs = await helper.getBlogs();
  expect(newBlogs[newBlogs.length - 1].likes).toEqual(0);
});

test("no title or url results to 400 bad requests", async () => {
  const noTitleBlog = {
    author: "testNoTitle",
    url: "testNoTitle",
    likes: 1,
  };
  const noUrlBlog = {
    title: "testNoUrl",
    author: "testNoUrl",
    likes: 1,
  };
  await api.post("/api/blogs").send(noTitleBlog).expect(400);
  await api.post("/api/blogs").send(noUrlBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
