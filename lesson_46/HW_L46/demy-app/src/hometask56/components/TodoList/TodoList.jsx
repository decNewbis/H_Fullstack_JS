import { useState } from 'react';

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  return (
    <div>
      <input
        data-testid="taskInput"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button data-testid="addTaskButton" onClick={handleAddTask}>Add Task</button>
      <ul data-testid="todoList">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};
