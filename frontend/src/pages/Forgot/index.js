import React from 'react';
import { useHistory } from 'react-router-dom';

import { Content, Container } from './styles';

import Button from '../../components/Button';

function Forgot() {
  const history = useHistory();

  return (
    <Container>
      <Content>
        <h1>Login: gustavo@teste.com</h1>
        <h1>senha: 123456</h1>
        <Button onClick={history.goBack} name="Sair">
          Voltar
        </Button>
      </Content>
    </Container>
  );
}

export default Forgot;
