import { BASE_API_URL } from "@/helpers/envs";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
