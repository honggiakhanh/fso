const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "test1",
    author: "test1",
    url: "test1",
    likes: 3,
  },
  {
    title: "test2",
    author: "test2",
    url: "test2",
    likes: 5,
  },
];

const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  getBlogs,
};
