import { Role } from "../enums/Role";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role | string;
  profile: string;
  phone_number: string;
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
