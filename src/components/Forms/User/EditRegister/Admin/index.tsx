import { useEffect } from "react";

import { EditRegisterForm } from "./EditRegisterForm";
import useEditRegisterForm from "../EditRegisterForm.hook";
import SpinnerLoad from "@/components/SpinnerLoad";
import { apiError } from "@/helpers/messages";

function EditRegister() {
  const {
    data,
    isLoading,
    isSendingEmail,
    isUpdateUserPeding,
    error,
    formErros,
    formSubmitting,
    onSubmit,
    register,
    currentValues,
    control,
    sendEmail,
    reset,
    handleSubmit,
    setSendEmail,
    updateUserRegisterLoading,
    disabledRoleChange,
    canChangeRole,
  } = useEditRegisterForm();

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.data.fullName,
        email: data.data.email,
        bornDate: data.data.bornDate,
        gender: data.data.gender,
        otherGender: data.data.otherGender,
        disabledPerson: data.data.disabledPerson,
        disabledPersonDescription: data.data.disabledPersonDescription,
        registerStatus: data.data.registerStatus,
        role: data.data.role,
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
    <EditRegisterForm
      control={control}
      userName={data?.data.fullName}
      errors={formErros}
      isSubmitting={
        isSendingEmail ||
        isUpdateUserPeding ||
        formSubmitting ||
        updateUserRegisterLoading
      }
      currentValues={currentValues}
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      sendEmail={sendEmail}
      setSendEmail={setSendEmail}
      disabledRoleChange={disabledRoleChange}
      canChangeRole={canChangeRole}
    />
  );
}

export default EditRegister;
