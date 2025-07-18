// IMPORTANT! File name should match the component name. 


import './App.css'
import TodoList from './TodoList';
import TodoForm from './TodoForm';


// The component name must be capitalized.
function App() {

 return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map(todo =>
          <li key={todo.id}>{todo.title}</li>)}
          </ul>
    </div>
  )
}

export default App
