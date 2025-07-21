import { handleForgotPassword } from "@/api/password";
import { useRouter } from "@/utils/libs/routerFacade";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useForgotPassword() {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<{ email: string }>();

  const {
    postForgotPasswordFn,
    isPostForgotPasswordSucess,
    isPostForgotPasswordPending,
    hasPostForgotPasswordError,
  } = handleForgotPassword();

  useEffect(() => {
    if (isPostForgotPasswordSucess) navigate("/");
  }, [isPostForgotPasswordSucess]);

  const onSubmit: SubmitHandler<{ email: string }> = ({ email }) =>
    postForgotPasswordFn(email);

  return {
    navigate,
    register,
    handleSubmit,
    onSubmit,
    isPostForgotPasswordSucess,
    isPostForgotPasswordPending,
    hasPostForgotPasswordError,
    errors,
    isValid,
    isSubmitting,
  };
}
