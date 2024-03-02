export interface Body {
  email: string;
  password: string;
}

export interface User {
  userId: number;
  userName: string;
  passwordHash: string;
}
