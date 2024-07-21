import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "./TodoList";

describe('TodoList', () => {
  it('should render input field, add button and empty list initially', () => {
    render(<TodoList />);
    const taskInput = screen.getByTestId("taskInput");
    const addTaskButton = screen.getByTestId("addTaskButton");
    const todoList = screen.getByTestId("todoList");

    expect(taskInput).toBeInTheDocument();
    expect(addTaskButton).toBeInTheDocument();
    expect(todoList).toBeInTheDocument();
    expect(todoList).toBeEmptyDOMElement();
  });

  it('should update the task state on input change', () => {
    render(<TodoList />);
    const taskInput = screen.getByTestId("taskInput");

    fireEvent.change(taskInput, { target: { value: "Task 1"}});
    expect(taskInput.value).toBe('Task 1');
  });

  it('should add a new tsk to the list and clear input field when add button clicked', () => {
    render(<TodoList />);
    const taskInput = screen.getByTestId("taskInput");
    const addTaskButton = screen.getByTestId("addTaskButton");

    fireEvent.change(taskInput, { target: { value: "Task 1"}});
    fireEvent.click(addTaskButton);
    expect(taskInput.value).toBe('');

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent('Task 1');
  });

  it('should not to add an empty task to the list', () => {
    render(<TodoList />);
    const addTaskButton = screen.getByTestId("addTaskButton");

    fireEvent.click(addTaskButton);
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});