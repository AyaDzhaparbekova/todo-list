export const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  setLoadError: 'setLoadError',
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  revertTodo: 'revertTodo',
  clearError: 'clearError',
};

export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };

    case actions.loadTodos: {
      const records = action.records || [];
      const todos = records.map(record => {
        const todo = {
          id: record.id,
          ...record.fields,
        };
        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }
        return todo;
      });
      return {
        ...state,
        todoList: todos,
        isLoading: false,
      };
    }

    case actions.setLoadError:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        errorMessage:
          action.error?.message || action.error || 'Error loading todos',
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
        errorMessage: '',
      };

    case actions.addTodo: {
      const record = action.record;
      const saved = {
        id: record.id,
        ...record.fields,
      };
      if (!saved.isCompleted) {
        saved.isCompleted = false;
      }
      return {
        ...state,
        todoList: [...state.todoList, saved],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return {
        ...state,
        isSaving: false,
      };
    case actions.updateTodo: {
      const edited = action.editedTodo;
      const updatedTodos = state.todoList.map(t =>
        t.id === edited.id ? edited : t
      );
      let errorMsg = '';
      if (action.error) {
        errorMsg = action.error.message || action.error;
      }
      return {
        ...state,
        todoList: updatedTodos,
        errorMessage: errorMsg,
      };
    }

    case actions.completeTodo: {
      const id = action.id;
      const updatedTodos = state.todoList.map(t =>
        t.id === id ? { ...t, isCompleted: true } : t
      );
      let errorMsg = '';
      if (action.error) {
        errorMsg = action.error.message || action.error;
      }
      return {
        ...state,
        todoList: updatedTodos,
        errorMessage: errorMsg,
      };
    }

    case actions.revertTodo: {
      const previous = action.previousTodos || [];
      return {
        ...state,
        todoList: previous,
        isSaving: false,
      };
    }
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    default:
      return state;
  }
}

export default reducer;
