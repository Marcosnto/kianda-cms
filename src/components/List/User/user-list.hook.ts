import useStore from "@/store";
import getStatusBadge from "@/utils/getStatusBadge";
import { RegisterProps } from "@/utils/types/forms";
import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useGetUsers, { updateUserStatus } from "@/api/user";

const userList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { currentSelectedUser } = useStore();

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

  const { users, error, isLoading, totalPages } = useGetUsers(currentPage);

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
          fullName: currentSelectedUser?.fullName,
          email: currentSelectedUser?.email,
          registerStatus: data.registerStatus,
          sendEmail: true,
        });

        if (!isUpdateUserPeding) {
          statusOptionsFormReset();
          onCloseUpdateRegisterModal();
        }
      },
      [
        currentSelectedUser?.email,
        currentSelectedUser?.fullName,
        currentSelectedUser?.id,
        // isSendingEmail,
        isUpdateUserPeding,
        onCloseUpdateRegisterModal,
        statusOptionsFormReset,
        updateUserStatusMutation,
      ],
    );

  const onOpenModalUpdateRegister = useCallback(
    (registerStatus: string) => {
      setValue("registerStatus", registerStatus);
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
  };
};

export default userList;
