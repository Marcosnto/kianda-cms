import { postUserAutoRegister } from "@/api/user";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/helpers/envs";
import { useRouter } from "@/utils/libs/routerFacade";
import { useBoolean, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { sendEmail } from "@/api/email";
import AutoRegisterEmail from "@/helpers/emails/template/auto-register-email";

export default function useAutoRegister() {
  const [modalStatus, setModalStatus] = useBoolean();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
  });
  const {
    postUserAutoRegisterFn,
    isPostUserAutoRegisterSucess,
    isPostUserAutoRegisterPending,
    hasPostUserAutoRegisterError,
  } = postUserAutoRegister();

  const { sendEmailFn, isSendingEmail } = sendEmail();

  const toast = useToast();
  const navigate = useRouter();
  const privacyPolicyLink = PRIVACY_POLICY;
  const useTermsLink = TERMS_OF_USE;

  console.log("privacyPolicyLink", privacyPolicyLink);

  if (isPostUserAutoRegisterPending) {
    console.log("carregando post user...");
  }

  useEffect(() => {
    if (hasPostUserAutoRegisterError) {
      console.error("Erro ao registrar usuário:", hasPostUserAutoRegisterError);
      toast({
        title: `Ocorreu um erro ao registrar!`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  }, [hasPostUserAutoRegisterError, toast]);

  useEffect(() => {
    if (isPostUserAutoRegisterSucess) {
      setModalStatus.on();
      sendEmailFn({
        emailsPool: userData.email,
        body: AutoRegisterEmail({ name: userData.fullName }),
        emailSubject: "Cadastro realizado com sucesso!",
      });
    }
  }, [isPostUserAutoRegisterSucess, setModalStatus]);

  const onModalClose = useCallback(() => {
    setModalStatus.off();
    navigate("/login");
  }, []);

  return {
    privacyPolicyLink,
    useTermsLink,
    modalStatus,
    post: postUserAutoRegisterFn,
    onModalClose,
    navigate,
    showPassword,
    setShowPassword,
    setUserData,
    isSendingEmail,
  };
}
