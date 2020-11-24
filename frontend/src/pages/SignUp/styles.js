import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  }

  h1 {
    margin-bottom: 40px;
    font-family: sans-serif;
  }

  a {
    color: #1298e8;
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#1298e8')};
    }
  }

  .help-container {
    display: flex;
    justify-content: center;
  }

  .help-container p {
    color: gray;
  }

  .logo {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .logo img {
    width: 200px;
    height: 50px;
  }

  @media (min-width: 700px) {
    display: grid;
    grid-template-rows: 20vh 70vh 10vh;
    grid-template-columns: 1fr;
    grid-template-areas:
      'logo'
      'form'
      'footer';

    .logo {
      grid-area: logo;
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
    .logo img {
      width: 200px;
      height: 50px;
      margin-left: 50px;
    }

    .form-container {
      grid-area: form;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .help-container {
      grid-area: footer;
      display: flex;
      justify-content: flex-start;
      margin-left: 50px;
    }
  }

  @media (min-width: 1370px) {


    display: grid;
    grid-template-rows: 20vh 70vh 10vh;
    grid-template-columns: 1fr;
    grid-template-areas:
      'logo'
      'form'
      'footer';

    .logo {
      grid-area: logo;
    }

    .form-container {
      grid-area: form;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -150px;
    }

    .help-container {
      grid-area: footer;
      display: flex;
      justify-content: flex-start;
    }
  }
`;

