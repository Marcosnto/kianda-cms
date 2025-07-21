import { BASE_API_URL } from "@/helpers/envs";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export const handleForgotPassword = () => {
  const toast = useToast();

  const {
    mutate: postForgotPasswordFn,
    isPending: isPostForgotPasswordPending,
    isError: hasPostForgotPasswordError,
    isSuccess: isPostForgotPasswordSucess,
  } = useMutation({
    mutationFn: (email: string) =>
      axios.post(`${BASE_API_URL}/forgot-password`, {
        email: email,
      }),
    onSuccess: () => {
      toast({
        title: `Verifique o seu email!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
    },
  });

  return {
    postForgotPasswordFn,
    isPostForgotPasswordSucess,
    isPostForgotPasswordPending,
    hasPostForgotPasswordError,
  };
};

export const handleResetPassword = () => {
  const toast = useToast();

  const {
    mutate: postResetPasswordFn,
    isPending: isPostResetPasswordPending,
    isError: hasPostResetPasswordError,
    isSuccess: isPostResetPasswordSucess,
  } = useMutation({
    mutationFn: ({
      id,
      token,
      password,
    }: {
      id: string;
      token: string;
      password: string;
    }) =>
      axios.post(`${BASE_API_URL}/reset-password`, {
        ID: id,
        token,
        password,
      }),
    onSuccess: () => {
      toast({
        title: `Senha alterada com sucesso!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
    },
  });

  return {
    postResetPasswordFn,
    isPostResetPasswordSucess,
    isPostResetPasswordPending,
    hasPostResetPasswordError,
  };
};

export const handleChangePassword = () => {
  const toast = useToast();

  const {
    mutate: postChangePasswordFn,
    isPending: isPostChangePasswordPending,
    isError: hasPostChangePasswordError,
    isSuccess: isPostChangePasswordSucess,
  } = useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) =>
      axiosInstance.post(`${BASE_API_URL}/change-password`, {
        currentPassword,
        newPassword,
      }),
    onSuccess: () => {
      toast({
        title: `Senha alterada com sucesso!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
    },
    onError: ({ response }: AxiosError) => {
      //@ts-ignore
      const { data } = response;
      console.log("error", data);
      if (data.message === "Senha atual incorreta") {
        toast({
          title: `Senha atual incorreta!`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  return {
    postChangePasswordFn,
    isPostChangePasswordSucess,
    isPostChangePasswordPending,
    hasPostChangePasswordError,
  };
};
