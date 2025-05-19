import useStore from "@/store";
import { RegisterProps } from "@/utils/types/forms";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProps } from "@/utils/types/user";
import { fetchUsers, updateUserStatus } from "@/api/user";

export type LoggedUserType = {
  id: number;
  role: string;
  name: string;
};

export default function useEditRegisterForm() {
  // const [sendEmail, setSendEmail] = useState(false);
  const [data, setData] = useState<UserProps>();
  const { currentSelectedUser } = useStore();
  const loggedUser: LoggedUserType = JSON.parse(
    localStorage.getItem("user") || "",
  );
  const canChangeRole = loggedUser.role == "admin";
  const disabledRoleChange = currentSelectedUser?.id == loggedUser.id;

  const {
    updateUserStatusMutation,
    updateUserRegisterMutation,
    isUpdateUserPeding,
    // isSendingEmail,
    updateUserRegisterLoading,
  } = updateUserStatus();

  const { fetchData, isLoading, error } = fetchUsers();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

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
        updateUserRegisterMutation({
          id: currentSelectedUser?.id,
          fullName: data.fullName,
          email: data.email,
          registerStatus: data.registerStatus,
          role: data.role,
          sendEmail: false,
        });
      }
    },
    [currentSelectedUser, isValid, updateUserStatusMutation],
  );

  return {
    data,
    isLoading,
    // isSendingEmail,
    isUpdateUserPeding,
    error,
    formErros,
    formSubmitting,
    control,
    currentValues,
    // sendEmail,
    disabledRoleChange,
    updateUserRegisterLoading,
    canChangeRole,
    register,
    reset,
    handleSubmit,
    onSubmit,
    // setSendEmail,
  };
}
