import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("Blog should only renders title and author by default", () => {
  const blog = {
    title: "test title",
    author: "test author",
    url: "testurl/test",
    likes: 1,
  };

  const { container } = render(<Blog blog={blog} />);

  const testBlog = container.querySelector(".blog");

  screen.debug(testBlog)

  expect(testBlog).toHaveTextContent("test title");
  expect(testBlog).toHaveTextContent("test author");
  expect(testBlog).not.toHaveTextContent("testurl/test");
  expect(testBlog).not.toHaveTextContent("1");
});
