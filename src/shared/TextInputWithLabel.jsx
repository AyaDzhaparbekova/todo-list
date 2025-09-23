function TextInputWithLabel({ elementId, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={elementId}>{label}</label>
      <input id={elementId} type='text' value={value} onChange={onChange} />
    </div>
  );
}

export default TextInputWithLabel;
