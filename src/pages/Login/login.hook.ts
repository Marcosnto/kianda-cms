import { useState } from "react";

import { useRouter } from "@/utils/libs/routerFacade";
import { useHandleLogin } from "@/api/auth";

export default function useLogin() {
  const navigate = useRouter();
  const [apiError, setApiError] = useState(false);

  const {
    loginFn,
    isErrorLogin,
    isPendingLogin,
    isSucessLogin,
    registerStatus,
  } = useHandleLogin();

  return {
    isErrorLogin,
    isPendingLogin,
    isSucessLogin,
    apiError,
    registerStatus,
    navigate,
    setApiError,
    loginFn,
  };
}
