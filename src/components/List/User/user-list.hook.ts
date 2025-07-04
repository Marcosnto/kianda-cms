import useStore from "@/store";
import getStatusBadge from "@/utils/getStatusBadge";
import { RegisterProps } from "@/utils/types/forms";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateUserStatus, useGetUsers } from "@/api/user";
import { useParams } from "react-router-dom";

const userList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const { updateUserStatusMutation, isUpdateUserPeding } = updateUserStatus();

  const {
    control: statusOptionsFormControl,
    handleSubmit: statusOptionsFormHandleSubmit,
    reset: statusOptionsFormReset,
    setValue,
    formState: {
      errors: statusOptionsFormErrors,
      isSubmitting: statusOptionsFormIsSubmitting,
    },
  } = useForm<Partial<RegisterProps>>({
    defaultValues: {
      registerStatus: "",
    },
  });

  const statusOptionsFormOnSubmit: SubmitHandler<Partial<RegisterProps>> =
    useCallback(
      (data) => {
        updateUserStatusMutation({
          id: currentSelectedUser?.id,
          // fullName: currentSelectedUser?.fullName,
          // email: currentSelectedUser?.email,
          registerStatus: data.registerStatus,
          sendEmail: true,
        });

        if (!isUpdateUserPeding) {
          statusOptionsFormReset();
          onCloseUpdateRegisterModal();
        }
      },
      [
        // currentSelectedUser?.email,
        // currentSelectedUser?.fullName,
        currentSelectedUser?.id,
        // isSendingEmail,
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
    // isSendingEmail,
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
  };
};

export default userList;
