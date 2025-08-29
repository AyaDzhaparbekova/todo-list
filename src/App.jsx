import { useEffect, useState } from 'react';
import TodoForm from './features/TodoList/TodoForm';
import TodoList from './features/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await fetch(url, {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.title || 'Untitled',
          isCompleted: record.fields.isCompleted || false,
        }));

        setTodoList(todos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const saveTodo = async title => {
    setIsSaving(true);
    setErrorMessage('');

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            title,
            isCompleted: false,
          },
        }),
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }

      const data = await resp.json();
      console.log('Airtable response:', data);

      const savedTodo = {
        id: record.id,
        ...record.fields,
      };
      if (!record.fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.error('❌ Save error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addTodo = title => {
    saveTodo(title);
  };

  const completeTodo = id => {
    const updatedTodos = todoList.map(todo =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList(updatedTodos);
  };

  const updateTodo = async editedTodo => {
    const originalTodo = todoList.find(todo => todo.id === editedTodo.id);
    setTodoList(prev =>
      prev.map(todo => (todo.id === editedTodo.id ? editedTodo : todo))
    );
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const updatedRecord = data.records[0];
      const updatedTodo = {
        id: updatedRecord.id,
        title: updatedRecord.fields.title || 'Untitled',
        isCompleted: updatedRecord.fields.isCompleted || false,
      };

      setTodoList(prev =>
        prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (error) {
      setErrorMessage(error.message);
      setTodoList(prev =>
        prev.map(todo => (todo.id === originalTodo.id ? originalTodo : todo))
      );
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      {isLoading && <p>Loading...</p>}
      {isSaving && <p>Saving...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
