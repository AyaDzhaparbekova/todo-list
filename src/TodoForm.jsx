import React, { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef(null);

  function handleAddTodo(event) {
    event.preventDefault();

    const title = todoTitleInput.current.value.trim();
    if (!title) return;

    onAddTodo(title);

    todoTitleInput.current.value = '';
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor='todoTitle'>Todo</label>
      <input type='text' id='todoTitle' name='title' ref={todoTitleInput} defaultValue=""/>

      <button type='submit'>Add Todo</button>
    </form>
  );
}

export default TodoForm;
