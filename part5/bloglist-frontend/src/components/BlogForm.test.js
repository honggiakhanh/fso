import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm";

test("BlogForm submit works", () => {
  const mockSubmit = jest.fn()

  const { container } = render(<BlogForm addBlog={mockSubmit} />);

  const title = container.querySelector(".title")
  const author = container.querySelector(".author")
  const url = container.querySelector(".url")

  const button = screen.getByText("Submit")

  userEvent.type(title, "test title")
  userEvent.type(author, "test author")
  userEvent.type(url, "test url")
  userEvent.click(button)

  expect(mockSubmit.mock.calls).toBeDefined();
  expect(mockSubmit.mock.calls[0][0].title).toBe("test title");
  expect(mockSubmit.mock.calls[0][0].author).toBe("test author");
  expect(mockSubmit.mock.calls[0][0].url).toBe("test url");
});
