import { Reducer } from "react";
import { AuthAction, AuthActionType } from "./actions";
import { AuthState } from "@/global/types/Auth";
import { Role } from "@/global/enums/Role";

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
  user: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    role: Role.CLIENT,
    profile: "",
    phone_number: "",
  },
  accessToken: "",
};

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case AuthActionType.LOG_IN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: true,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case AuthActionType.LOG_OUT:
      localStorage.removeItem("user");
      return defaultAuthState;
    default:
      return state;
  }
};

export default authReducer;
