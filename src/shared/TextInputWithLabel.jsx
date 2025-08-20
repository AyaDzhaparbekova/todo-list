import React from 'react';

function TextInputWithLabel({ elementId, labelText, value, onChange, ref }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type='text'
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
