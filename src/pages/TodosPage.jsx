import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TodoForm from '../features/TodoList/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodoList/TodosViewForm';

function TodosPage(props) {
  const {
    todoList,
    isLoading,
    isSaving,
    errorMessage,
    onAddTodo,
    onCompleteTodo,
    onUpdateTodo,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    queryString,
    setQueryString,
    onDismissError,
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const filtered = todoList; // Could later apply filtering based on queryString
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/'); // Redirect if page is invalid
      }
    }
  }, [currentPage, totalPages, navigate]);

  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const currentTodos = filtered.slice(
    indexOfFirst,
    indexOfFirst + itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: (currentPage - 1).toString() });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: (currentPage + 1).toString() });
    }
  };

  return (
    <div>
      <TodoForm onAddTodo={onAddTodo} isSaving={isSaving} />

      <TodoList
        todoList={currentTodos}
        isLoading={isLoading}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
      />

      <div className='paginationControls'>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>

      <hr />

      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {errorMessage && (
        <div>
          <hr />
          <p role='alert'>Error: {errorMessage}</p>
          <button onClick={onDismissError}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default TodosPage;
