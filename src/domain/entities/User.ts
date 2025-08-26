export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
