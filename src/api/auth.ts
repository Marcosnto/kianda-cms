import { AuthContext } from "@/contexts/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { axiosInstance } from "./axiosInstance";
import { JWT_AUTH, JWT_VALIDATE } from "@/helpers/envs";
import { LoginProps, ResponseProps } from "@/pages/Login/types";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

export const useHandleLogin = () => {
  const { signin } = useContext(AuthContext);
  const [registerStatus, setRegisterStatus] = useState<
    String | number | undefined
  >();

  const {
    mutate: loginFn,
    isError: isErrorLogin,
    isPending: isPendingLogin,
    isSuccess: isSucessLogin,
  } = useMutation({
    mutationFn: (data: LoginProps) =>
      axiosInstance.post(
        JWT_AUTH,
        JSON.stringify({ username: data.email, password: data.password }),
      ),
    onSuccess: ({ data }: { data: ResponseProps }) => {
      setRegisterStatus(data.registerStatus);
      if (data.registerStatus === "1") {
        const user = {
          id: data.id,
          role: data.role,
          name: data.user_display_name,
        };
        localStorage.setItem("user", JSON.stringify(user));
        signin?.(data.token);
      }
    },
  });

  return {
    registerStatus,
    loginFn,
    isErrorLogin,
    isPendingLogin,
    isSucessLogin,
  };
};

export const handleValidateAuth = (signedIn: boolean) => {
  const {
    isLoading: isValidateAuthLoading,
    isError: isValidateAuthError,
    isSuccess: isValidateAuthSuccess,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: () => axiosInstance.post(JWT_VALIDATE),
    enabled: signedIn,
    retry: 3,
    staleTime: 30000,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
  });

  return { isValidateAuthLoading, isValidateAuthError, isValidateAuthSuccess };
};
