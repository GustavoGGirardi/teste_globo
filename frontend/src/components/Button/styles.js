import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #1298e8;
  font-family: sans-serif;
  font-size: 25px;
  letter-spacing: 1px;
  height: 56px;
  border-radius: 3px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: bold;
  color: white;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#1298e8')};
  }
`;
