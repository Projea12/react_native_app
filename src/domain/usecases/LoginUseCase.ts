import { User, AuthCredentials } from '../entities/User';
import { IAuthRepository } from '../repositories/IAuthRepository';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: AuthCredentials): Promise<User> {
    // Validate credentials
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    return await this.authRepository.login(credentials);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
