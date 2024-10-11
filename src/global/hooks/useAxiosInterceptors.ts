import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axiosClient from "../lib/axiosClient";

const useAxiosInterceptors = () => {
  const queryClient = useQueryClient();
  const { globalLogOutDispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          if (localStorage.getItem("user")) {
            const authToken = JSON.parse(
              localStorage.getItem("user") ?? ""
            ).accessToken;

            config.headers["Authorization"] = "Bearer " + authToken;
          }
        }

        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    axiosClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error.response); // debug
        if (error.response && error.response.status === 401) {
          console.log("unauthorised");
          globalLogOutDispatch();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [queryClient, navigate]);
};

export default useAxiosInterceptors;

// import axiosClient from "@/axiosClient";
// import { useEffect, useContext } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import authCtx from "@/stores/auth/AuthContextProvider";
// import { useNavigate } from "react-router-dom";
// import { useRefreshToken } from "./api/auth.api";

// const useAxiosInterceptors = () => {
//   const queryClient = useQueryClient();
//   const { globalLogOutDispatch, globalLogInDispatch } = useContext(authCtx);
//   const navigate = useNavigate();
//   const refreshToken = useRefreshToken();

//   useEffect(() => {
//     axiosClient.interceptors.request.use(
//       (config) => {
//         if (!config.headers["Authorization"]) {
//           if (localStorage.getItem("user")) {
//             const authToken = JSON.parse(
//               localStorage.getItem("user") ?? ""
//             ).accessToken;

//             config.headers["Authorization"] = "Bearer " + authToken;
//           }
//         }

//         return config;
//       },
//       (error) => {
//         console.log(error);
//         return Promise.reject(error);
//       }
//     );

//     axiosClient.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       async (error) => {
//         const originalRequest = error.config;

//         if (error.response && error.response.status === 401) {
//           try {
//             const responseData = await refreshToken.mutateAsync(null);
//             axiosClient.defaults.headers[
//               "Authorization"
//             ] = `Bearer ${responseData?.accessToken}`;
//             originalRequest.headers[
//               "Authorization"
//             ] = `Bearer ${responseData?.accessToken}`;
//             globalLogInDispatch(responseData);
//             return axiosClient(originalRequest);
//           } catch (refreshError) {
//             globalLogOutDispatch();
//             navigate("/login");
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [queryClient, navigate]);
// };

// export default useAxiosInterceptors;
