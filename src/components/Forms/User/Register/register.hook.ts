import { BASE_API_URL } from "@/helpers/envs";
import { RegisterProps } from "@/utils/types/forms";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { SubmitHandler, UseFormReset } from "react-hook-form";

export default function useRegisterHook({
  reset,
  isValid,
}: {
  reset: UseFormReset<RegisterProps>;
  isValid: boolean;
}) {
  const toast = useToast();
  const token = localStorage.getItem("token");

  const post = useCallback(
    (data: RegisterProps) => {
      fetch(BASE_API_URL + "/user" || "", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          role: data.role,
          acceptTerms: false,
        }),
      }).then((response) => {
        if (response.ok) {
          fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              senderEmail: "teste@kiandadiversidade.com",
              senderName: "Kianda",
              recepients: [{ email: data.email, name: data.fullName }],
              template: "admin-register",
              subject: "Cadastro realizado com sucesso!",
            }),
          }).then(() => {
            toast({
              title: `Usuário cadastro com sucesso`,
              position: "top",
              status: "success",
              isClosable: true,
            });
            reset();
          });
        } else if (response.status === 403) {
          toast({
            title: `Esse email já está possui cadastro`,
            position: "top",
            status: "warning",
            isClosable: true,
          });
        } else {
          toast({
            title: `Ocorreu um erro no servidor`,
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
      });
    },
    [reset, toast],
  );

  const onSubmit: SubmitHandler<RegisterProps> = useCallback(
    (data) => {
      if (isValid) {
        post(data);
      }
    },
    [isValid, post],
  );

  return {
    post,
    onSubmit,
  };
}
