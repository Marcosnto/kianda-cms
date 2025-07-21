import { handleChangePassword } from "@/api/password";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useChangePassword = () => {
  const navigate = useNavigate();
  const {
    postChangePasswordFn,
    isPostChangePasswordSucess,
    isPostChangePasswordPending,
    hasPostChangePasswordError,
  } = handleChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<{
    currentPassword: string;
    newPassword: string;
    newPasswordCheck: string;
  }>();

  const onSubmit = ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => postChangePasswordFn({ currentPassword, newPassword });

  return {
    register,
    handleSubmit,
    getValues,
    navigate,
    onSubmit,
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    isPostChangePasswordSucess,
    isPostChangePasswordPending,
    hasPostChangePasswordError,
    errors,
    isValid,
    isSubmitting,
  };
};

export default useChangePassword;
