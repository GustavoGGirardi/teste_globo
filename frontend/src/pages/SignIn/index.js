import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoMdHelpCircle } from 'react-icons/io';
import { signInSchema, signInErrors } from '../../utils/yupSingIn';

import { useAuth } from '../../hooks/auth';
import { Content, Container } from './styles';


import Input from '../../components/Input';
import Button from '../../components/Button';

function SignIn() {
  const { signIn } = useAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = evt => {
    evt.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      signInSchema.validateSync(
        {
          email,
          password,
        },
        {
          abortEarly: false,
        },
      );

      signIn({ email, password });
    } catch (err) {
      const errors = signInErrors(err);

      setFormErrors(errors);
    }
  };

  return (
    <Container>
      <Content>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <Input
              id="email"
              label="E-mail"
              ref={emailRef}
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="off"
              error={formErrors.email}
            />
            <Input
              id="password"
              label="Password"
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Password"
              error={formErrors.password}
            />

            <Link to="/forgot"> Criar usuário </Link>

            <Button type="submit" className="buttons">
              Entrar
            </Button>
          </form>
        </div>

        <div className="help-container">
          <Link to="/login">
            <IoMdHelpCircle />
            <p>Precisa de ajuda?</p>
          </Link>
        </div>
      </Content>
    </Container>
  );
}

export default SignIn;
