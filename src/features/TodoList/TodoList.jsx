import styles from '../../TodoList.module.css';
import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter(todo => !todo.isCompleted);

  if (isLoading) {
    return <p>To do list loading...</p>;
  }

  if (filteredTodoList.length === 0) {
    return <p>Add to do above to get started</p>;
  }

  return (
    <ul className={styles.todoList}>
      {filteredTodoList.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
