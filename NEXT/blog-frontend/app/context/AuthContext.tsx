/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// CORRECCIÓN 1: Declaramos la interfaz del usuario directamente aquí.
// Esto evita la importación circular de '../lib/api' que rompe el compilador de TypeScript.
export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Carga inicial controlando la hidratación en Next.js
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // CORRECCIÓN 2: Usamos las llaves unificadas 'token_ecommerce' y 'user_ecommerce'
      const savedToken = localStorage.getItem('token_ecommerce');
      const savedUser = localStorage.getItem('user_ecommerce');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Error al parsear el usuario guardado", e);
        }
      }
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token_ecommerce', newToken);
      localStorage.setItem('user_ecommerce', JSON.stringify(newUser));
    }
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token_ecommerce');
      localStorage.removeItem('user_ecommerce');
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);