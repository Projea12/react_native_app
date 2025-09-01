import auth from '@react-native-firebase/auth';
import { User, AuthCredentials, SignupCredentials } from '../../domain/entities/User';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AuthUser } from '../../domain/entities/auth_user';


export class AuthRepository implements IAuthRepository{
  async signIn(email: string, password: string): Promise<AuthUser> {
    const res = await auth().createUserWithEmailAndPassword(email,password);
    const user = res.user;
    return{
      uid:user.uid,
      email:user.email,
      displayName:user.displayName
    }
  }

  async Login(email: string, password: string): Promise<AuthUser> {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      const user = res.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (err: any) {
      let message = "Login failed. Please try again.";
      if (err.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (err.code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (err.code === "auth/invalid-email") {
        message = "Invalid email format.";
      }
      throw new Error(message);
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
      const res = auth().currentUser;
      if(!res) return null;

      return {
        uid:res.uid,
        email:res.email,
        displayName:res.displayName
      }
  }

  async signOut():Promise<void> {
    await auth().signOut();
  }
}