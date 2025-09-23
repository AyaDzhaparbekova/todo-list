import styled from 'styled-components';import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';


const StyledButton = styled.button`
  font-style: ${props => (props.disabled ? '' : 'normal')};
`;

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    if (!workingTodoTitle.trim()) return;

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
  }
  

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId='todoTitle'
        label='Todo'
        value={workingTodoTitle}
        onChange={e => setWorkingTodoTitle(e.target.value)}
      />
      
      <StyledButton disabled={workingTodoTitle === ''}>
        Add Todo
      </StyledButton>
    </form>
  );
}

export default TodoForm;
