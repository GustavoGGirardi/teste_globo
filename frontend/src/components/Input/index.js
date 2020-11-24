import React, { forwardRef } from 'react';
import { Container } from './styles';

const Input = forwardRef((props, ref) => {
  const { label, id, error } = props;
  console.log(error);
  return (
    <Container error={error}>
      <input ref={ref} {...props} />
      {label && <label htmlFor={id}>{label}</label>}
      {label && <small htmlFor={id}>{error}</small>}
    </Container>
  );
});

export default Input;
