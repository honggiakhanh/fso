const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.reduce((prevblog, currblog) =>
    prevblog.likes >= currblog.likes ? prevblog : currblog
  );
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
