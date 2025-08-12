import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    if (!workingTodoTitle.trim()) return;

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor='todoTitle'>Todo</label>
      <input
        type='text'
        id='todoTitle'
        name='title'
        value={workingTodoTitle}
        onChange={e => setWorkingTodoTitle(e.target.value)}
      />
      <button type='submit' disabled={workingTodoTitle === ''}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
