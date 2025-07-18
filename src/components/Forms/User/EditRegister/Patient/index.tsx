import { useEffect } from "react";

import useEditRegisterForm from "../EditRegisterForm.hook";
import SpinnerLoad from "@/ui/SpinnerLoad";
import { apiError } from "@/helpers/messages";
import { UserEditRegisterForm } from "./UserEditRegisterForm";

function UserEditRegister() {
  const {
    data,
    isLoading,
    isUpdateUserPeding,
    error,
    formErros,
    formSubmitting,
    onSubmit,
    register,
    currentValues,
    control,
    reset,
    handleSubmit,
    updateUserRegisterLoading,
  } = useEditRegisterForm();

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName,
        email: data.email,
        bornDate: data.bornDate,
        gender: data.gender,
        otherGender: data.otherGender,
        disabledPerson: data.disabledPerson,
        disabledPersonDescription: data.disabledPersonDescription,
        registerStatus: data.registerStatus,
        role: data.role,
      });
    }
  }, [data, reset]);

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  return (
    <UserEditRegisterForm
      control={control}
      errors={formErros}
      isSubmitting={
        isUpdateUserPeding || formSubmitting || updateUserRegisterLoading
      }
      currentValues={currentValues}
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      isToSendEmail={false}
    />
  );
}

export default UserEditRegister;
