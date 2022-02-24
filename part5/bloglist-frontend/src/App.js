import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/logins";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const addBlog = (blog) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
    };

    blogService.addNew(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  return (
    <div>
      {user === null ? (
        <div>
          <h2>login</h2>

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div>
              password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : null}
      {user !== null ? (
        <div>
          <h3>
            {user.username} logged in
            <button
              type="button"
              onClick={() => window.localStorage.removeItem("user")}
            >
              Logout
            </button>
          </h3>
          <Togglable buttonLabel="blog form" ref={blogFormRef}>
            <BlogForm
              addBlog={addBlog}
            />
          </Togglable>

          <h2>blogs</h2>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>Login to see blog posts</div>
      )}
    </div>
  );
};

export default App;
