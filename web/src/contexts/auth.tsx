import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthData {
  loading: boolean;
  user: User | null;
  signIn(email: string, password: string, stayLoggedIn: boolean): void;
  signOut(): void;
}

const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    const sessionUser = sessionStorage.getItem('user');

    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    const finalToken = storedToken || sessionToken;
    const finalUser = storedUser || sessionUser;

    if (finalToken && finalUser) {
      api.defaults.headers.Authorization = `Bearer ${finalToken}`;
      setUser(JSON.parse(finalUser));
    }

    setLoading(false);
  }, []);

  async function signIn(
    email: string,
    password: string,
    stayLoggedIn: boolean
  ) {
    const response = await api.post('/session', {
      email,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(user);

      if (stayLoggedIn) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    }
  }

  async function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        loading: loading,
        user: user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
