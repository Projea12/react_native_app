import React, { createContext, useContext, useReducer, useEffect, ReactNode, useState } from 'react';
import { AuthRepository } from '../../data/repositories/AuthRepository';
import { AuthUser } from '../../domain/entities/auth_user';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
};

type AuthContextType = {
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const repository: IAuthRepository = new AuthRepository();

  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await repository.getCurrentUser(); // ✅ call function
        setState({ user: currentUser, loading: false });
      } catch (err) {
        setState({ user: null, loading: false });
      }
    };
    init();
  }, []);

  const signIn = async (email: string, password: string) => {
    const user = await repository.signIn(email, password);
    setState({ user, loading: false });
  };

  const login = async (email: string, password: string) => {
    const user = await repository.Login(email, password);
    setState({ user, loading: false }); 
  };

  const signOut = async () => {
    await repository.signOut();
    setState({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ state, signIn, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook for consumers ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
