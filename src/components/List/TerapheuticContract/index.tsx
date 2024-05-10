import ButtonsActions from "@/components/Forms/components/ActionsButton/ActionsButtons";
import SpinnerLoad from "@/components/SpinnerLoad";
import TableList from "@/components/Table";
import ComponentTitle from "@/components/Title";
import getStatusBadge from "@/utils/getStatusBadge";
import { apiError } from "@/helpers/messages";
import {
  terapheuticContractListOptions,
  terapheuticContractTableHeaders,
} from "@/helpers/tableConfigs";
import useUsersList from "@/utils/hooks/user/useUsersList";
import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function TerapheuticContractsList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cookie] = useCookies(["token"]);
  const token = cookie.token;
  const { users, error, isLoading, totalPages } = useUsersList(
    currentPage,
    token,
  );

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  const tableBody = users?.map((user) => (
    <Tr key={user.id}>
      <Td>{user.id}</Td>
      <Td>{user.fullName}</Td>
      <Td>
        {user.terapheuticContractComplete &&
          getStatusBadge(
            +user.terapheuticContractComplete === 0 ? "complete" : "incomplete",
          )}
      </Td>
      <Td>
        <ButtonsActions
          tableOptions={terapheuticContractListOptions}
          user={user}
        />
      </Td>
    </Tr>
  ));

  return (
    <>
      <ComponentTitle title="Contratos Terapêuticos" type="h1" size="lg" />
      <TableList
        headers={terapheuticContractTableHeaders}
        totalPages={totalPages}
        currentPage={currentPage}
        tableBody={tableBody}
        tableOptions={terapheuticContractListOptions}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
