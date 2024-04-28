import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";

import useUsersList from "../../../utils/hooks/user/useUsersList";
import SpinnerLoad from "../../SpinnerLoad";
import { apiError } from "../../../helpers/messages";
import { terapheuticContractList } from "../../../utils/types/user";
import getStatusBadge from "../../../utils/getStatusBadge";
import ButtonsActions from "../../Forms/components/ActionsButton/ActionsButtons";
import ComponentTitle from "../../Title";
import TableList from "../../Table";
import {
  terapheuticContractListOptions,
  terapheuticContractTableHeaders,
} from "../../../helpers/tableConfigs";

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
  console.log(users);
  const tableBody = users.map((user: terapheuticContractList) => (
    <Tr key={user.id}>
      <Td>{user.id}</Td>
      <Td>{user.name}</Td>
      <Td>{getStatusBadge(+user.status === 0 ? "complete" : "incomplete")}</Td>
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
