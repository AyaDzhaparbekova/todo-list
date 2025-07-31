import React, { useState } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [newTodo, setNewTodo] = useState("Aya's First Todo");
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} />
      <TodoList newTodo={newTodo} setNewTodo={setNewTodo} />
    </div>
  );
}
export default App;
