import { useBoolean, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import { useCallback } from "react";
import { RegisterProps } from "../../../../utils/types/forms";
import {
  PUBLIC_PRIVACY_POLICY,
  PUBLIC_USE_TERMS,
} from "../../../../utils/helpers/envs";
import { useRouter } from "../../../../utils/router/routerFacade";

export default function useAutoRegister() {
  const [modalStatus, setModalStatus] = useBoolean();
  const toast = useToast();
  const navigate = useRouter();
  const privacyPolicyLink = PUBLIC_PRIVACY_POLICY;
  const useTermsLink = PUBLIC_USE_TERMS;

  const { mutate: sendEmailPost, isPending: isSendingEmail } = useMutation({
    mutationFn: (data: Partial<RegisterProps>) =>
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: "teste@kiandadiversidade.com",
          senderName: "Kianda",
          recepients: [{ email: data.email, name: data.fullName }],
          template: "auto-register",
          subject: "Cadastro realizado com sucesso!",
        }),
      }),
    onSuccess: (response) => {
      if (response.ok) {
        setModalStatus.on();
      } else {
        toast({
          title: `Ocorreu um erro ao enviar o email!`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  const post = useCallback(
    (data: RegisterProps) => {
      fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user-register" || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          bornDate: data.bornDate,
          email: data.email,
          password: data.password,
          pronouns: data.pronouns,
          gender: data.gender,
          otherGender: data.otherGender,
          disabledPerson: data.disabledPerson,
          disabledPersonDescription: data.disabledPersonDescription,
          acceptTerms: data.acceptTerm ? 1 : 0,
        }),
      }).then(async (response) => {
        if (response.ok) {
          sendEmailPost(data);
        } else {
          toast({
            title: `Ocorreu um erro ao registrar!`,
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
      });
    },
    [sendEmailPost, toast],
  );

  const onModalClose = useCallback(() => {
    setModalStatus.off();
    navigate("/login");
  }, [setModalStatus]);

  return {
    isSendingEmail,
    privacyPolicyLink,
    useTermsLink,
    modalStatus,
    post,
    onModalClose,
    navigate,
  };
}
