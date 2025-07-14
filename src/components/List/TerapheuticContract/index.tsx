import ActionsButtons from "@/components/Forms/components/ActionsButton/ActionsButtons";
import SpinnerLoad from "@/ui/SpinnerLoad";
import TableList from "@/ui/Table";
import ComponentTitle from "@/ui/Title";
import getStatusBadge from "@/utils/getStatusBadge";
import { apiError } from "@/helpers/messages";
import {
  terapheuticContractListOptions,
  terapheuticContractTableHeaders,
} from "@/helpers/tableOptionsConfigs";

import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useGetUsers } from "@/api/user";

export default function TerapheuticContractsList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { users, error, isLoading, totalPages } = useGetUsers(
    currentPage,
    "patient",
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
            +user.terapheuticContractComplete === 0 ? "incomplete" : "complete",
          )}
      </Td>
      <Td>
        <ActionsButtons
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
