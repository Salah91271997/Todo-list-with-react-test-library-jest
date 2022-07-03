import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Todo from "../Todo";

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  );
};
const addTask = (task) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", { name: /Add/i });
  task.forEach((task) => {
    fireEvent.change(inputElement, {
      target: { value: task },
    });
    fireEvent.click(buttonElement);
  });
};

describe("Todo", () => {
  test("should render input element", () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });
    fireEvent.click(buttonElement);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  test("should find an array [1 element] of values", () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).toBeInTheDocument();
  });
  test("should find an array of values", () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping", "crap"]);
    const divElements = screen.getAllByTestId("task");
    expect(divElements.length).toBe(2);
  });
  test("should render multiple items", () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping", "crap"]);
    const divElements = screen.getAllByTestId("task");
    expect(divElements.length).toBe(2);
  });
  test("task should not have completed class when initialy rendered", () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });
  test("task should  have completed class when clicked", () => {
    render(<MockTodo />);
    addTask(["Go Grocery Shopping"]);
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass("todo-item-active");
  });
});
