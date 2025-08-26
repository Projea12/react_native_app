import { User, AuthCredentials, SignupCredentials } from '../../domain/entities/User';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

export class AuthRepository implements IAuthRepository {
  private currentUser: User | null = null;

  async login(credentials: AuthCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, create a mock user
    const user: User = {
      id: Date.now().toString(),
      email: credentials.email,
      fullName: 'Demo User',
      createdAt: new Date(),
    };

    this.currentUser = user;
    return user;
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, create a mock user
    const user: User = {
      id: Date.now().toString(),
      email: credentials.email,
      fullName: credentials.fullName,
      createdAt: new Date(),
    };

    this.currentUser = user;
    return user;
  }

  async logout(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async isAuthenticated(): Promise<boolean> {
    return this.currentUser !== null;
  }
}
