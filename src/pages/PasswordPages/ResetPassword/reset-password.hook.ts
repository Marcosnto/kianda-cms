import { useEffect, useState } from "react";

import { useRouter } from "@/utils/libs/routerFacade";
import { SubmitHandler, useForm } from "react-hook-form";
import { handleResetPassword } from "@/api/password";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function useResetPassword() {
  const navigate = useRouter();
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const token = searchParams.get("token");
  const id = searchParams.get("user_id");

  const [showPassword, setShowPassword] = useState(false);
  const {
    postResetPasswordFn,
    isPostResetPasswordPending,
    hasPostResetPasswordError,
  } = handleResetPassword();

  useEffect(() => {
    if (hasPostResetPasswordError) {
      toast({
        title: `Link expirado! Por favor, solicite um novo`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  }, [hasPostResetPasswordError]);

  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors, isValid, isSubmitting },
  } = useForm<{ password: string; passwordCheck: string }>();

  const onSubmit: SubmitHandler<any> = ({ password }) => {
    if (id && token) {
      postResetPasswordFn({ id, token, password });
    }
  };

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
    isPostResetPasswordPending,
  };
}
