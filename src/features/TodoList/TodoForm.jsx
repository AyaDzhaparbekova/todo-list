import styled from 'styled-components';
import React, { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

const StyledButton = styled.button`
  font-style: normal;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

 
  console.log(
    'TodoForm render: workingTodoTitle =',
    workingTodoTitle,
    'isSaving =',
    isSaving
  );

  function handleAddTodo(event) {
    event.preventDefault();
    console.log('handleAddTodo called, title =', workingTodoTitle);

    const trimmed = workingTodoTitle.trim();
    if (!trimmed) {
      console.log('handleAddTodo: title is empty after trim — not adding');
      return;
    }

    onAddTodo(trimmed);
    setWorkingTodoTitle('');
  }

  const isDisabled = workingTodoTitle.trim() === '' || isSaving;

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId='todoTitle'
        label='To do:'
        value={workingTodoTitle}
        onChange={e => {
          console.log(
            'TextInputWithLabel onChange, new value =',
            e.target.value
          );
          setWorkingTodoTitle(e.target.value);
        }}
      />

      <StyledButton type='submit' disabled={isDisabled}>
        {isSaving ? 'Adding...' : 'Add Todo'}
      </StyledButton>
    </form>
  );
}

export default TodoForm;
