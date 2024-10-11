/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosAuthClient from "@/global/lib/axiosAuthClient";
import { LoginForm, User } from "@/global/types/Auth";

type RegisterResponseType = {
  user: User;
};
type LoginResponseType = {
  user: User;
};
type RegisterResponse = AxiosResponse<RegisterResponseType>;

type LoginFormPropsVariables = LoginForm;
type LogoutVariables = null;

type FetchLoggedInUserResponse = User;

type LoginFormPropsResponse = AxiosResponse<LoginResponseType>;

const loginForm = async (
  values: LoginFormPropsVariables
): Promise<LoginFormPropsResponse> => {
  const response = await axiosAuthClient.post("login", values);
  return response;
};

const useLoginForm = (): UseMutationResult<
  LoginFormPropsResponse,
  Error,
  LoginFormPropsVariables,
  unknown
> => {
  const mutationConfig: UseMutationOptions<
    LoginFormPropsResponse,
    Error,
    LoginFormPropsVariables,
    unknown
  > = {
    mutationFn: (values) => loginForm(values),
  };

  return useMutation(mutationConfig);
};

const logout = async (
  values: LogoutVariables
): Promise<LoginFormPropsResponse> => {
  const response = await axiosAuthClient.post("logout", values);
  return response;
};

const useLogout = (): UseMutationResult<
  LoginFormPropsResponse,
  Error,
  LogoutVariables,
  unknown
> => {
  const mutationConfig: UseMutationOptions<
    LoginFormPropsResponse,
    Error,
    LogoutVariables,
    unknown
  > = {
    mutationFn: () => logout(null),
    onSuccess: () => {},
    onError: () => {},
  };

  return useMutation(mutationConfig);
};

const fetchLoggedInUser = async (): Promise<FetchLoggedInUserResponse> => {
  const parsed = await axiosAuthClient.get(`me`);
  return parsed.data;
};

const useGetLoggedInUser = (): UseQueryResult<
  FetchLoggedInUserResponse,
  Error
> =>
  useQuery<FetchLoggedInUserResponse, Error>({
    queryKey: ["logged-in-user"],
    queryFn: () => fetchLoggedInUser(),
  });

const registerDCompanyModel = async (
  values: any
): Promise<RegisterResponse> => {
  const response = await axiosAuthClient.post("register", values);
  return response;
};

const useRegister = (): UseMutationResult<
  RegisterResponse,
  Error,
  any,
  unknown
> => {
  const mutationConfig: UseMutationOptions<
    RegisterResponse,
    Error,
    any,
    unknown
  > = {
    mutationFn: (values) => registerDCompanyModel(values),
  };

  return useMutation(mutationConfig);
};

export { useLoginForm, useLogout, useGetLoggedInUser, useRegister };
