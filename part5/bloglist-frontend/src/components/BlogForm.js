import React, { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor("")
    setTitle("")
    setUrl("")
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlog}>
        <div>
          title:
          <input
            name="title"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            name="author"
            className="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            name="url"
            className="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
