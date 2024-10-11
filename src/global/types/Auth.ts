export type User = {
  id: string;
  email: string;
  username: string;
  organization_id: string;
  token: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

export type AuthState = {
  isLoggedIn: boolean;
  user: User;
  accessToken: string;
};

export interface AuthContextType {
  authState: AuthState;
  globalLogInDispatch: (user: User) => void;
  globalLogOutDispatch: () => void;
}

export type AuthProviderProps = {
  children: React.ReactElement;
};
