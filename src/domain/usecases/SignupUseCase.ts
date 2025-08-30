import { User, SignupCredentials } from '../entities/User';
import { IAuthRepository } from '../repositories/IAuthRepository';

export class SignupUseCase {
  constructor(private authRepository: IAuthRepository) {}
  
  async execute(credentials: SignupCredentials): Promise<User> {
    this.validateCredentials(credentials);

    return await this.authRepository.signup(credentials);
  }

  private validateCredentials(credentials: SignupCredentials): void {
    if (!credentials.fullName?.trim()) {
      throw new Error('Full name is required');
    }

    if (!credentials.email?.trim()) {
      throw new Error('Email is required');
    }

    if (!credentials.password?.trim()) {
      throw new Error('Password is required');
    }

    if (!credentials.confirmPassword?.trim()) {
      throw new Error('Password confirmation is required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
