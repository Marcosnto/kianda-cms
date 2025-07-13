import { getNewsletterList } from "@/api/email";
import SpinnerLoad from "@/ui/SpinnerLoad";
import TableList from "@/ui/Table";
import { apiError } from "@/helpers/messages";
import ComponentTitle from "@/ui/Title";
import { newsletterTableHeards } from "@/helpers/tableConfigs";
import { Td, Tr } from "@chakra-ui/react";

export default function NewsLetterList() {
  const { newsletterList, isLoading, error } = getNewsletterList();

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  const tableBody = newsletterList?.map(
    ({ id, email }: { id: string; email: string }) => (
      <Tr key={id}>
        <Td>{id}</Td>
        <Td>{email}</Td>

        {/* <Td>
        <ButtonsActions
          user={user}
          tableOptions={userListOptions}
          modalsOptions={modalsStateControl}
        />
      </Td> */}
      </Tr>
    ),
  );

  return (
    <>
      <ComponentTitle title="Assinantes da Newsletter" type="h1" />
      <TableList
        headers={newsletterTableHeards}
        totalPages={1}
        currentPage={1}
        tableBody={tableBody}
        tableOptions={[]}
        setCurrentPage={() => console.log("1")}
      />
    </>
  );
}
