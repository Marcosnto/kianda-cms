import { useState } from "react";

import { useRouter } from "@/utils/libs/routerFacade";
import { handleLogin } from "@/api/auth";

export default function useLogin() {
  const navigate = useRouter();
  const [apiError, setApiError] = useState(false);

  const {
    loginFn,
    isErrorLogin,
    isPendingLogin,
    isSucessLogin,
    registerStatus,
  } = handleLogin();

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
