import useStore from "@/store";
import useFetchUser from "@/hooks/user/useFetchUser";
import useUpdateUserStatus from "@/hooks/user/useUpdateUserStatus";
import { RegisterProps } from "@/utils/types/forms";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type LoggedUserType = {
  id: number;
  role: string;
  name: string;
};

export default function useEditRegisterForm() {
  const [sendEmail, setSendEmail] = useState(false);
  const { currentSelectedUser } = useStore();
  const loggedUser: LoggedUserType = JSON.parse(
    localStorage.getItem("user") || "",
  );
  const canChangeRole = loggedUser.role == "admin";
  const disabledRoleChange = currentSelectedUser?.id == loggedUser.id;

  const {
    updateUserStatusMutation,
    isUpdateUserPeding,
    isSendingEmail,
    updateUserRegisterLoading,
  } = useUpdateUserStatus();

  const { data, isLoading, error } = useFetchUser();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors: formErros, isSubmitting: formSubmitting, isValid },
  } = useForm<Partial<RegisterProps>>();

  const currentValues = getValues();

  const onSubmit: SubmitHandler<Partial<RegisterProps>> = useCallback(
    (data: Partial<RegisterProps>) => {
      if (isValid) {
        updateUserStatusMutation({
          id: currentSelectedUser?.id,
          fullName: data.fullName,
          email: data.email,
          registerStatus: data.registerStatus,
          role: data.role,
          sendEmail: sendEmail,
        });
      }
    },
    [currentSelectedUser, isValid, sendEmail, updateUserStatusMutation],
  );

  return {
    data,
    isLoading,
    isSendingEmail,
    isUpdateUserPeding,
    error,
    formErros,
    formSubmitting,
    control,
    currentValues,
    sendEmail,
    disabledRoleChange,
    updateUserRegisterLoading,
    canChangeRole,
    register,
    reset,
    handleSubmit,
    onSubmit,
    setSendEmail,
  };
}
