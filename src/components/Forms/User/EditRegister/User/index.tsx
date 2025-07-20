import { useEffect } from "react";

import SpinnerLoad from "@/ui/SpinnerLoad";
import { apiError } from "@/helpers/messages";
import { EditUserRegisterForm } from "./EditUserRegisterForm";
import useEditUser from "./EditUser.hook";

function UserEditRegister() {
  const {
    data,
    isLoading,
    error,
    formErros,
    formSubmitting,
    onSubmit,
    register,
    getValues,
    currentValues,
    control,
    reset,
    watch,
    handleSubmit,
    updateUserRegisterLoading,
  } = useEditUser();

  useEffect(() => {
    if (data) {
      console.log("initial data", data);
      reset({
        fullName: data.fullName,
        email: data.email,
        emailCheck: data.email,
        bornDate: data.bornDate,
        gender: data.gender,
        otherGender: data.otherGender,
        pronouns: data.pronouns,
        avatar: data.avatar,
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
    <EditUserRegisterForm
      control={control}
      avatar={data?.avatar || ""}
      watch={watch}
      errors={formErros}
      getValues={getValues}
      isSubmitting={formSubmitting || updateUserRegisterLoading}
      currentValues={currentValues}
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      isToSendEmail={false}
    />
  );
}

export default UserEditRegister;
