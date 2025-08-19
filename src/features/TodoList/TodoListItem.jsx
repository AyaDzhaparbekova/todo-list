import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleEdit(e) {
    setWorkingTitle(e.target.value);
  }
  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }
  function handleUpdate() {
    const updatedTodo = { ...todo,title: workingTitle };
    onUpdateTodo(updatedTodo);
    setIsEditing(false);
  }
  return (
    <li>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`title-${todo.id}`}
              label='Todo'
              value={workingTitle}
              onChange={handleEdit}
            />
            <button type='button' onClick={handleCancel}>
              Cancel
            </button>
            <button type='submit'>Update</button>
          </>
        ) : (
          <>
            <label>
              <input
                type='checkbox'
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
