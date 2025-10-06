import './App.css';
import styles from './App.module.css';
import logo from './assets/images/logo.png';

import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import TodosPage from './pages/TodosPage';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './shared/Header';



import {
  initialState as initialTodosState,
  actions as todoActions,
  reducer as todosReducer,
} from './reducers/todos.reducer';

const urlBase = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const { todoList, isLoading, isSaving, errorMessage } = todoState;

  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const buildUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}", title)`;
    }
    return encodeURI(`${urlBase}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    let cancelled = false;
    async function fetchTodos() {
      dispatch({ type: todoActions.fetchTodos });
      try {
        const resp = await fetch(buildUrl(), {
          method: 'GET',
          headers: { Authorization: token },
        });
        if (!resp.ok) {
          throw new Error(resp.statusText || `HTTP ${resp.status}`);
        }
        const json = await resp.json();
        const { records } = json;
        if (!cancelled) {
          dispatch({ type: todoActions.loadTodos, records });
        }
      } catch (err) {
        if (!cancelled) {
          dispatch({ type: todoActions.setLoadError, error: err });
        }
      }
    }
    fetchTodos();
    return () => {
      cancelled = true;
    };
  }, [buildUrl, token]);

  async function addTodo(title) {
    const payload = {
      records: [{ fields: { title, isCompleted: false } }],
    };
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(urlBase, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        throw new Error(resp.statusText || `HTTP ${resp.status}`);
      }
      const json = await resp.json();
      const { records } = json;
      dispatch({ type: todoActions.addTodo, record: records[0] });
    } catch (err) {
      dispatch({ type: todoActions.setLoadError, error: err });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function completeTodo(id) {
    const previousTodos = todoList;
    dispatch({ type: todoActions.startRequest });
    dispatch({ type: todoActions.completeTodo, id });
    const payload = {
      records: [{ id, fields: { isCompleted: true } }],
    };
    try {
      const resp = await fetch(urlBase, {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        throw new Error(resp.statusText || `HTTP ${resp.status}`);
      }
    } catch (err) {
      dispatch({ type: todoActions.revertTodo, previousTodos });
      dispatch({ type: todoActions.setLoadError, error: err });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function updateTodo(editedTodo) {
    const previousTodos = todoList;
    dispatch({ type: todoActions.startRequest });
    dispatch({ type: todoActions.updateTodo, editedTodo });
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
      const resp = await fetch(urlBase, {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        throw new Error(resp.statusText || `HTTP ${resp.status}`);
      }
    } catch (err) {
      dispatch({ type: todoActions.revertTodo, previousTodos });
      dispatch({ type: todoActions.setLoadError, error: err });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  function dismissError() {
    dispatch({ type: todoActions.clearError });
  }

  return (
    <div className={styles.appContainer}>
      <Header title='' />
      <header className={styles.header}>
        <img src={logo} alt='logo' className={styles.logo} />
        <h1 className={styles.title}>To Do List</h1>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <TodosPage
              todoList={todoList}
              isLoading={isLoading}
              isSaving={isSaving}
              errorMessage={errorMessage}
              onAddTodo={addTodo}
              onCompleteTodo={completeTodo}
              onUpdateTodo={updateTodo}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
              onDismissError={dismissError}
            />
          }
        />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
