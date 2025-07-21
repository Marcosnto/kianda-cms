import { useState } from "react";

import { useRouter } from "@/utils/libs/routerFacade";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useResetPassword() {
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors, isValid, isSubmitting },
  } = useForm<{ password: string; passwordCheck: string }>();

  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return {
    navigate,
    getValues,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    isSubmitting,
  };
}
