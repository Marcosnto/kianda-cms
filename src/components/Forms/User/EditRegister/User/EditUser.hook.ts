import useStore from "@/store";
import { RegisterProps } from "@/utils/types/forms";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProps } from "@/utils/types/user";
import { fetchUsers, updateUserRegister } from "@/api/user";

export type LoggedUserType = {
  id: number;
  role: string;
  name: string;
};

export default function useEditUser() {
  const [data, setData] = useState<UserProps>();
  const { currentSelectedUser } = useStore();
  const loggedUser: LoggedUserType = JSON.parse(
    localStorage.getItem("user") || "",
  );

  const {
    updateUserRegisterMutation,
    updateUserRegisterLoading,
    isUpdateUserRegisterSucess,
  } = updateUserRegister();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    watch,
    formState: { errors: formErros, isSubmitting: formSubmitting, isValid },
  } = useForm<Partial<RegisterProps> & { isToSendEmail?: boolean }>({
    defaultValues: {
      registerStatus: "",
      isToSendEmail: false,
    },
  });

  const currentValues = getValues();

  const { fetchData, isLoading, error } = fetchUsers();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const onSubmit: SubmitHandler<Partial<RegisterProps>> = useCallback(
    (data: Partial<RegisterProps> & { isToSendEmail?: boolean }) => {
      if (isValid) {
        const formData = new FormData();
        formData.append("id", String(loggedUser.id));
        formData.append("fullName", data.fullName || "");
        formData.append("email", data.email || "");
        formData.append("bornDate", data.bornDate?.toString() || "");
        formData.append("gender", data.gender || "");
        formData.append("otherGender", data.otherGender || "");
        formData.append("pronouns", data.pronouns || "");

        if (data.avatar && data.avatar[0] instanceof File) {
          formData.append("avatar", data.avatar[0]);
        }

        updateUserRegisterMutation({
          userData: formData,
          id: String(loggedUser.id),
        });
      }
    },
    [currentSelectedUser, isValid],
  );

  return {
    data,
    isLoading,
    error,
    formErros,
    formSubmitting,
    control,
    watch,
    getValues,
    currentValues,
    register,
    reset,
    handleSubmit,
    onSubmit,
    updateUserRegisterLoading,
    isUpdateUserRegisterSucess,
  };
}
