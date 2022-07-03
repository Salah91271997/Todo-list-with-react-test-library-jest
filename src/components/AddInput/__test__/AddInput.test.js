import { render, screen, fireEvent } from "@testing-library/react";
import AddInput from "../AddInput";

const mockSetTodo = jest.fn();

describe("AddInput", () => {
  test("should render input element", () => {
    render(<AddInput todos={[]} setTodos={mockSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("should be able tp type in the input", () => {
    render(<AddInput todos={[]} setTodos={mockSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, {
      target: { value: "Go Grocery Shopping" },
    });

    expect(inputElement.value).toBe("Go Grocery Shopping");
  });
  test("should have empty input when botton is clicked", () => {
    render(<AddInput todos={[]} setTodos={mockSetTodo} />);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(buttonElement);

    expect(buttonElement.value).toBe("");
  });
});
