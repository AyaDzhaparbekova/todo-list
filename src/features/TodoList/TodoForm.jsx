import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';



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
      <TextInputWithLabel
        elementId='todoTitle'
        label='Todo'
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
