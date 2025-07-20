import { useState } from "react";

import { useRouter } from "@/utils/libs/routerFacade";
import { useHandleLogin } from "@/api/auth";
import { LoginProps } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useLogin() {
  const navigate = useRouter();
  const [apiError, setApiError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    loginFn,
    isErrorLogin,
    isPendingLogin,
    isSucessLogin,
    registerStatus,
  } = useHandleLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = (data) => loginFn(data);

  return {
    isErrorLogin,
    isPendingLogin,
    isSucessLogin,
    apiError,
    registerStatus,
    navigate,
    setApiError,
    loginFn,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
