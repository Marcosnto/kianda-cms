import useStore from "@/store";
import getStatusBadge from "@/utils/getStatusBadge";
import { RegisterProps } from "@/utils/types/forms";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserStatus, useGetUsers } from "@/api/user";
import { useParams } from "react-router-dom";
import { sendEmail } from "@/api/email";
import UpdatedUser from "@/helpers/emails/template/updated-register";
import { UserProps } from "@/utils/types/user";

const useUserList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isToSendEmail, setIsToSendEmail] = useState<boolean>(false);
  const { type: userType } = useParams();
  const { currentSelectedUser } = useStore();
  let pageTitle = "";

  switch (userType) {
    case "patient":
      pageTitle = "Pacientes";
      break;
    case "blog_editor":
      pageTitle = "Editores";
      break;
    default:
      pageTitle = "Usuários";
      break;
  }

  const {
    isOpen: isOpenUpdateRegisterModal,
    onOpen: onOpenUpdateRegisterModal,
    onClose: onCloseUpdateRegisterModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const { users, error, isLoading, totalPages } = useGetUsers(
    currentPage,
    userType,
  );

  const { updateUserStatusMutation, isUpdateUserPeding, isUpdateUserSuccess } =
    updateUserStatus();
  const { sendEmailFn, isSendingEmail } = sendEmail();

  const {
    control: statusOptionsFormControl,
    handleSubmit: statusOptionsFormHandleSubmit,
    reset: statusOptionsFormReset,
    setValue,
    formState: {
      errors: statusOptionsFormErrors,
      isSubmitting: statusOptionsFormIsSubmitting,
    },
  } = useForm<Partial<RegisterProps> & { isToSendEmail?: boolean }>({
    defaultValues: {
      registerStatus: "",
      isToSendEmail: false,
    },
  });

  useEffect(() => {
    if (isUpdateUserSuccess) {
      if (isToSendEmail) {
        const { fullName, email, registerStatus } =
          currentSelectedUser as UserProps;

        const emailData = {
          emailsPool: email,
          body: UpdatedUser({
            name: fullName,
            status: registerStatus || "",
          }),
          emailSubject: `Atualização de cadastro`,
        };
        sendEmailFn(emailData);
      }

      statusOptionsFormReset();
      onCloseUpdateRegisterModal();
    }
  }, [isUpdateUserSuccess, isToSendEmail, sendEmailFn]);

  const statusOptionsFormOnSubmit: SubmitHandler<
    Partial<RegisterProps> & { isToSendEmail?: boolean }
  > = useCallback(
    (data) => {
      setIsToSendEmail(data.isToSendEmail || false);
      updateUserStatusMutation({
        id: currentSelectedUser?.id,
        registerStatus: data.registerStatus,
      });
    },
    [
      currentSelectedUser?.id,
      isUpdateUserPeding,
      onCloseUpdateRegisterModal,
      statusOptionsFormReset,
      updateUserStatusMutation,
    ],
  );

  const onOpenModalUpdateRegister = useCallback(
    (modalInfo: {
      user: string;
      postId?: string | number;
      registerStatus?: string;
    }) => {
      setValue("registerStatus", modalInfo.registerStatus);
      onOpenUpdateRegisterModal();
    },
    [onOpenUpdateRegisterModal, setValue],
  );

  const getTableStatusBadge = useCallback(
    (userRegisterStatus: string) => getStatusBadge(userRegisterStatus),
    [],
  );

  const modalsStateControl = {
    "update-register-status": onOpenModalUpdateRegister,
    "suspend-register": onOpenDeleteModal,
  };

  return {
    currentPage,
    users,
    currentSelectedUser,
    error,
    isLoading,
    totalPages,
    modalsStateControl,
    statusOptionsFormControl,
    statusOptionsFormHandleSubmit,
    statusOptionsFormReset,
    statusOptionsFormErrors,
    statusOptionsFormIsSubmitting,
    isUpdateUserPeding,
    statusOptionsFormOnSubmit,
    isOpenUpdateRegisterModal,
    onOpenUpdateRegisterModal,
    onCloseUpdateRegisterModal,
    isOpenDeleteModal,
    onOpenDeleteModal,
    onCloseDeleteModal,
    setCurrentPage,
    getTableStatusBadge,
    pageTitle,
    isToSendEmail,
    isSendingEmail,
  };
};

export default useUserList;
