import useStore from "@/store/store";
import { RegisterProps } from "@/utils/types/forms";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProps } from "@/utils/types/user";
import { fetchUser, updateUserRegister, updateUserStatus } from "@/api/user";
import { sendEmail } from "@/api/email";
import UpdatedUser from "@/helpers/emails/template/updated-register";
import useUserStore from "@/store/userStore";

export default function useEditRegisterForm() {
  const [isToSendEmail, setIsToSendEmail] = useState(false);
  const [data, setData] = useState<UserProps>();
  const { currentSelectedUser } = useStore();
  const { loggedUser } = useUserStore();

  const canChangeRole = loggedUser && loggedUser.role == "admin";
  const disabledRoleChange =
    loggedUser && currentSelectedUser?.id == loggedUser.id;

  const { updateUserStatusMutation, isUpdateUserPeding, isUpdateUserSuccess } =
    updateUserStatus();

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

  const { sendEmailFn, isSendingEmail } = sendEmail();

  const { fetchData, isLoading, error } = fetchUser(false);

  useEffect(() => {
    if (isUpdateUserRegisterSucess || isUpdateUserSuccess) {
      const { fullName, registerStatus, email } =
        currentSelectedUser as UserProps;
      if (isToSendEmail && fullName && registerStatus && email) {
        const emailData = {
          emailsPool: email,
          body: UpdatedUser({ name: fullName, status: registerStatus }),
          emailSubject: `Atualização de cadastro`,
        };
        sendEmailFn(emailData);
      }
    }
  }, [
    isUpdateUserSuccess,
    isUpdateUserRegisterSucess,
    currentSelectedUser,
    isToSendEmail,
    sendEmailFn,
  ]);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const onSubmit: SubmitHandler<Partial<RegisterProps>> = useCallback(
    (data: Partial<RegisterProps> & { isToSendEmail?: boolean }) => {
      if (isValid && currentSelectedUser && currentSelectedUser.id) {
        setIsToSendEmail(data.isToSendEmail || false);

        const userData: Partial<RegisterProps> = {
          fullName: data.fullName,
          email: data.email,
          registerStatus: data.registerStatus,
          role: data.role,
        };

        updateUserRegisterMutation({
          userData: userData,
          id: String(currentSelectedUser.id),
        });
      }
    },
    [currentSelectedUser, isValid, updateUserStatusMutation],
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
    watch,
    getValues,
    currentValues,
    disabledRoleChange,
    updateUserRegisterLoading,
    canChangeRole,
    register,
    reset,
    handleSubmit,
    onSubmit,
    isToSendEmail,
    setIsToSendEmail,
  };
}
