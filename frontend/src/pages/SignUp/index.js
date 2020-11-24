import React, { useRef, useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { IoMdHelpCircle } from 'react-icons/io';
import { signInSchema, signInErrors } from '../../utils/yupSingIn';

import { useAuth } from '../../hooks/auth';
import { Content, Container } from './styles';

import { toast } from 'react-toastify';
import api from '../../services/api';


import Input from '../../components/Input';
import Button from '../../components/Button';

function SignIn() {
  const { signIn } = useAuth();
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const [redirect, setRedirect] = useState(false)

  const [formErrors, setFormErrors] = useState({});

  const chamaLogin = () => {
    setRedirect(true)
   }

  const handleSubmit = evt => {
    evt.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value

    try {
      signInSchema.validateSync(
        {
          email,
          password,
          name,
        },
        {
          abortEarly: false,
        },
      );

      signUp({ email, password, name });
      chamaLogin()
      toast.success("Usuario criado com sucesso")

    } catch (err) {
      const errors = signInErrors(err);

      setFormErrors(errors);
    }
  };

  const signUp = useCallback(async ({ email, password, name }) => {
    try {
      const response = await api.post('/users', { email, password, name });


    } catch ({ response }) {
      const { error } = response.data;
      toast.error(error);
    }
  }, []);

  return (


    <Container>
      { redirect ? <Redirect to="/login/" /> : null}
      <Content>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Criar Usuário</h1>
            <Input
              id="name"
              label="Nome"
              ref={nameRef}
              type="text"
              name="name"
              placeholder="Nome"
              autoComplete="off"
              error={formErrors.name}
            />
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

            <Link to="/login"> Realizar login </Link>

            <Button type="submit" className="buttons">
              Criar
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
