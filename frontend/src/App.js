import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

import GlobalStyles from './styles/global';

import AppProvider from './hooks';

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyles />
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
