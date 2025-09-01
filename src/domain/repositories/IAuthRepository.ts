import { AuthUser } from '../entities/auth_user';
import { User, AuthCredentials, SignupCredentials } from '../entities/User';

export interface IAuthRepository {
  signIn(emal:string,password:string):Promise<AuthUser>;
  Login(email:string,password:string):Promise<AuthUser>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
}
