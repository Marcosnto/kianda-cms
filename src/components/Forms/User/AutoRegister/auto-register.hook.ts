import { postUser } from "@/api/user";
import { PRIVACY_POLICY, USE_TERMS } from "@/helpers/envs";
import { useRouter } from "@/utils/libs/routerFacade";
import { useBoolean, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export default function useAutoRegister() {
  const [modalStatus, setModalStatus] = useBoolean();
  const [showPassword, setShowPassword] = useState(false);
  const { postUserFn, isPostUserSucess, isPostUserPending, hasPostUserError } =
    postUser();
  const toast = useToast();
  const navigate = useRouter();
  const privacyPolicyLink = PRIVACY_POLICY;
  const useTermsLink = USE_TERMS;

  if (isPostUserPending) {
    console.log("carregando post user...");
  }

  if (hasPostUserError) {
    toast({
      title: `Ocorreu um erro ao registrar!`,
      position: "top",
      status: "error",
      isClosable: true,
    });
  }

  if (isPostUserSucess && !modalStatus) {
    setModalStatus.on();
  }

  const onModalClose = useCallback(() => {
    setModalStatus.off();
    navigate("/login");
  }, []);

  return {
    privacyPolicyLink,
    useTermsLink,
    modalStatus,
    post: postUserFn,
    onModalClose,
    navigate,
    showPassword,
    setShowPassword,
  };
}
