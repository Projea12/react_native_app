import { User, AuthCredentials, SignupCredentials } from '../entities/User';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<User>;
  signup(credentials: SignupCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
}
