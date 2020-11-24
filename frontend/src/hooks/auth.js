import React, { useState, createContext, useCallback, useContext } from 'react';

import { toast } from 'react-toastify';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@SEU_APP:token');
    const user = localStorage.getItem('@SEU_APP:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      localStorage.setItem('@SEU_APP:token', token);
      localStorage.setItem('@SEU_APP:user', JSON.stringify(user.email));

      setData({ token, user: user.email });
    } catch ({ response }) {
      const { error } = response.data;
      toast.error(error);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SEU_APP:token');
    localStorage.removeItem('@SEU_APP:user');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error();
  }

  return context;
}
