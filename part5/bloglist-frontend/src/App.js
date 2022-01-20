import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/logins";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      console.log("logged in with", user);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      console.log("login failed");
    }
  };

  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    blogService.addNew(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
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
      ) : (
        <div></div>
      )}
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
          <h2>Create new blog</h2>
          <form onSubmit={addBlog}>
            <div>
              title:
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div>
              author:
              <input
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></input>
            </div>
            <div>
              url:
              <input
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              ></input>
            </div>
            <button type="submit">Submit</button>
          </form>

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
