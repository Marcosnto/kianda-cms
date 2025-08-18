import { useEffect } from "react";

import SpinnerLoad from "@/ui/SpinnerLoad";
import { apiError } from "@/helpers/messages";
import { EditUserRegisterForm } from "./EditUserRegisterForm";
import useEditUser from "./EditUser.hook";
import { GenericModal } from "@/ui/GenericModal";
import { Text } from "@chakra-ui/react";

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
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    deleteAccount,
  } = useEditUser();

  useEffect(() => {
    if (data) {
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

  const ModalContent = () => {
    return (
      <div>
        <Text>
          Gostaria mesmo de{" "}
          <Text as="b" color="red">
            deletar
          </Text>{" "}
          a sua conta?
          <br />
          Após isso será de deletada permanentemente e{" "}
          <Text as="b" color="red">
            não será possível reverter
          </Text>{" "}
          a ação.
        </Text>
      </div>
    );
  };

  return (
    <>
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
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        isToSendEmail={false}
      />
      <GenericModal
        content={<ModalContent />}
        onClose={() => setIsOpenDeleteModal(false)}
        onEsc={() => setIsOpenDeleteModal(false)}
        onConfirm={() => deleteAccount()}
        isOpen={isOpenDeleteModal}
        title="Deletar conta"
        btnCancelLabel="Cancelar"
        colorSchemeConfirm="red"
      />
    </>
  );
}

export default UserEditRegister;
