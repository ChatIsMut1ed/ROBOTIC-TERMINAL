import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { AuthActionType } from "./actions";
import authReducer, { defaultAuthState } from "./reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextType, AuthProviderProps, User } from "@/global/types/Auth";
import routes from "@/routes/app.routes";

const AuthContext = createContext<AuthContextType>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const currentRoute = routes.find(
      (route) => route.path === location.pathname
    );

    if (user) {
      const userData: User = JSON.parse(user);
      authDispatch({ type: AuthActionType.LOG_IN, payload: userData });
    }
    if (!user && currentRoute && currentRoute.layout !== "guest") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const globalLogInDispatch = useCallback(
    (user: User) => {
      authDispatch({ type: AuthActionType.LOG_IN, payload: user });
      navigate("/");
    },
    [navigate]
  );

  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionType.LOG_OUT, payload: null });
    navigate("/login");
  }, [navigate]);

  const contextValue = {
    authState,
    globalLogInDispatch,
    globalLogOutDispatch,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
