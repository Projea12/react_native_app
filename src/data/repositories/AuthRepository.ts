import auth from '@react-native-firebase/auth';
import { User, AuthCredentials, SignupCredentials } from '../../domain/entities/User';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';

// export class AuthRepository implements IAuthRepository {
//   private currentUser: User | null = null;

//   async login(credentials: AuthCredentials): Promise<User> {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // For demo purposes, create a mock user
//     const user: User = {
//       id: Date.now().toString(),
//       email: credentials.email,
//       fullName: 'Demo User',
//       createdAt: new Date(),
//     };

//     this.currentUser = user;
//     return user;
//   }

//   async signup(credentials: SignupCredentials): Promise<User> {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // For demo purposes, create a mock user
//     const user: User = {
//       id: Date.now().toString(),
//       email: credentials.email,
//       fullName: credentials.fullName,
//       createdAt: new Date(),
//     };

//     this.currentUser = user;
//     return user;
//   }

//   async logout(): Promise<void> {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 500));
//     this.currentUser = null;
//   }

//   async getCurrentUser(): Promise<User | null> {
//     return this.currentUser;
//   }

//   async isAuthenticated(): Promise<boolean> {
//     return this.currentUser !== null;
//   }
// }
export class AuthRepository implements IAuthRepository {
  async login(credentials: AuthCredentials): Promise<void> {
    await auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    const userCredential = await auth().createUserWithEmailAndPassword(
      credentials.email, 
      credentials.password
    );
    
    // Update user profile with full name
    if (userCredential.user) {
      await userCredential.user.updateProfile({
        displayName: credentials.fullName,
      });
    }

    const user: User = {
      id: userCredential.user.uid,
      email: credentials.email,
      fullName: credentials.fullName,
      createdAt: new Date(),
    };

    return user;
  }

  async logout(): Promise<void> {
    await auth().signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = auth().currentUser;
    
    if (!firebaseUser) {
      return null;
    }

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      fullName: firebaseUser.displayName || '',
      createdAt: firebaseUser.metadata.creationTime 
        ? new Date(firebaseUser.metadata.creationTime) 
        : new Date(),
    };

    return user;
  }

  async isAuthenticated(): Promise<boolean> {
    return auth().currentUser !== null;
  }
}
