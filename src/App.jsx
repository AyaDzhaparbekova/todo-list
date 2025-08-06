import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
  <TodoList todoList={TodoList} />;

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = title => {
    const newTodo = { id: Date.now(), title };
    setTodoList(prev => [...prev, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
