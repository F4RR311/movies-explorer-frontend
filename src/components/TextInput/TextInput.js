import React from 'react';
import './TextInput.css';

export default function TextInput({
  name, label, type, value, onChange, errorMessage, pattern,
}) {

  return (
    <label className="text-input" htmlFor={name}>
      <span className="text-input__name text-input__text">{label}</span>
      <input
        className="text-input__input text-input__text"
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        pattern={pattern}
        required
      />
      <span className="text-input__error text-input__text">{errorMessage}</span>
    </label>
  );
}
