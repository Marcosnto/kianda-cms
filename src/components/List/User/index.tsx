import { Td, Text, Tr } from "@chakra-ui/react";

import FeedbackAPI from "../../FeedbackAPI";
import ButtonsActions from "../../Forms/components/ActionsButton/ActionsButtons";
import RegisterStatusOptions from "../../Forms/components/RegisterStatusOptions";
import { GenericModal } from "../../GenericModal";
import TableList from "../../Table";
import ComponentTitle from "../../Title";
import useList from "./user-list.hook";
import SpinnerLoad from "../../SpinnerLoad";
import { apiError, noDataToShow } from "../../../helpers/messages";
import { UserProps } from "../../../utils/types/user";
import {
  userListOptions,
  userTableHeaders,
} from "../../../helpers/tableConfigs";

export default function UsersList() {
  const {
    currentPage,
    users,
    currentSelectedUser,
    error,
    isLoading,
    totalPages,
    modalsStateControl,
    statusOptionsFormControl,
    statusOptionsFormHandleSubmit,
    statusOptionsFormOnSubmit,
    isUpdateUserPeding,
    isSendingEmail,
    statusOptionsFormErrors,
    statusOptionsFormIsSubmitting,
    isOpenUpdateRegisterModal,
    onCloseUpdateRegisterModal,
    isOpenDeleteModal,
    onCloseDeleteModal,
    setCurrentPage,
    getTableStatusBadge,
  } = useList();

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  const tableBody = users.map((user: UserProps) => (
    <Tr key={user.id}>
      <Td>{user.id}</Td>
      <Td>{user.name}</Td>
      <Td>{getTableStatusBadge(user.registerStatus || "")}</Td>
      <Td>
        <ButtonsActions
          user={user}
          tableOptions={userListOptions}
          modalsOptions={modalsStateControl}
        />
      </Td>
    </Tr>
  ));

  const ContentUpdateRegistration = () => {
    return (
      <form onSubmit={statusOptionsFormHandleSubmit(statusOptionsFormOnSubmit)}>
        <RegisterStatusOptions
          errors={statusOptionsFormErrors}
          control={statusOptionsFormControl}
        />
      </form>
    );
  };

  const ContentArchiveRegistration = ({
    user,
  }: {
    user: UserProps | undefined;
  }) => {
    return (
      <div>
        <Text>
          Gostaria de arquivar o registro de <Text as="b">{user?.name}</Text>?
          <br />
          Após isso o cadastro referente será{" "}
          <Text as="b" color="red">
            suspenso
          </Text>{" "}
          e não conseguirá mais acessar a plataforma.
        </Text>
      </div>
    );
  };

  return (
    <>
      {users.length > 0 ? (
        <>
          <ComponentTitle title="Pacientes" type="h1" />
          <TableList
            headers={userTableHeaders}
            totalPages={totalPages}
            currentPage={currentPage}
            tableBody={tableBody}
            tableOptions={userListOptions}
            setCurrentPage={setCurrentPage}
          />
          <GenericModal
            title={`Status do cadastro - ${currentSelectedUser?.name}`}
            isOpen={isOpenUpdateRegisterModal}
            onClose={onCloseUpdateRegisterModal}
            content={<ContentUpdateRegistration />}
            isLoading={
              statusOptionsFormIsSubmitting ||
              isUpdateUserPeding ||
              isSendingEmail
            }
            onConfirm={statusOptionsFormHandleSubmit(statusOptionsFormOnSubmit)}
          />
          <GenericModal
            title="Arquivar Cadastro"
            isOpen={isOpenDeleteModal}
            onClose={onCloseDeleteModal}
            btnConfirmLabel="Suspender"
            colorSchemeConfirm="red"
            content={<ContentArchiveRegistration user={currentSelectedUser} />}
          />
        </>
      ) : (
        <FeedbackAPI message={noDataToShow} />
      )}
    </>
  );
}
