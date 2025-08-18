import useStore from "@/store/store";
import { RegisterProps } from "@/utils/types/forms";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProps } from "@/utils/types/user";
import { deleteUserRegister, fetchUser, updateUserRegister } from "@/api/user";
import useUserStore from "@/store/userStore";
import logout from "@/utils/logout";
import { useNavigate } from "react-router-dom";

export type LoggedUserType = {
  id: number;
  role: string;
  name: string;
};

export default function useEditUser() {
  const [data, setData] = useState<UserProps>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { currentSelectedUser } = useStore();
  const { loggedUser } = useUserStore();
  const navigate = useNavigate();

  const {
    updateUserRegisterMutation,
    updateUserRegisterLoading,
    isUpdateUserRegisterSucess,
  } = updateUserRegister();

  const { deleteUserRegisterFn, isDeleteUserRegisterSucess } =
    deleteUserRegister();

  const { removeLoggedUser } = useUserStore();

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

  const { fetchData, isLoading, error } = fetchUser(true);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const onSubmit: SubmitHandler<Partial<RegisterProps>> = useCallback(
    (data: Partial<RegisterProps> & { isToSendEmail?: boolean }) => {
      if (isValid) {
        const formData = new FormData();
        formData.append("id", String(loggedUser!.id));
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
          id: String(loggedUser!.id),
        });
      }
    },
    [currentSelectedUser, isValid],
  );

  useEffect(() => {
    if (isDeleteUserRegisterSucess) {
      logout();
      removeLoggedUser();
      navigate(0);
    }
  }, [isDeleteUserRegisterSucess, removeLoggedUser, navigate]);

  const deleteAccount = () => {
    deleteUserRegisterFn(String(loggedUser!.id));
  };

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
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    deleteAccount,
  };
}
