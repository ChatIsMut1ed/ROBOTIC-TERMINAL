import { useContext } from "react";
import { AuthContextType } from "../types/Auth";
import AuthContext from "../lib/auth/context";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};

export default useAuth;
