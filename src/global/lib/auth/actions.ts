import { User } from "@/global/types/Auth";

export enum AuthActionType {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
}

export type AuthAction =
  | {
      type: AuthActionType.LOG_IN;
      payload: User;
    }
  | {
      type: AuthActionType.LOG_OUT;
      payload: null;
    };
