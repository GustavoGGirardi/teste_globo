import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  & + div {
    margin-top: 35px;
  }

  label {
    font-size: 12px;
    position: absolute;
    left: 15px;
    top: 20px;
    font-family: sans-serif;
    color: #dcdcdc;
    transition: top 0.2s;
    padding: 0 4px;
    color: transparent;
  }

  input {
    background: white;
    border-radius: 3px;
    border: 2px solid ${props => (props.error ? 'red' : '#dcdcdc')};
    padding: 16px;
    width: 100%;

    &:focus + label {
      top: -6px;
      color: black;
      background-color: white;
    }

    &:focus::placeholder {
      color: transparent;
    }

    &::placeholder {
      color: #dcdcdc;
    }
  }

  small {
    color: red;
  }
`;
