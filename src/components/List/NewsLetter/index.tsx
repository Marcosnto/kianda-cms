import { getNewsletterList } from "@/api/email";
import SpinnerLoad from "@/ui/SpinnerLoad";
import TableList from "@/ui/Table";
import { apiError } from "@/helpers/messages";
import ComponentTitle from "@/ui/Title";
import { newsletterTableHeards } from "@/helpers/tableOptionsConfigs";
import { Box, Button, Td, Tr } from "@chakra-ui/react";

import { RiMailSendLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function NewsLetterList() {
  const { newsletterList, isLoading, error } = getNewsletterList();
  const navigate = useNavigate();

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
      </Tr>
    ),
  );

  return (
    <>
      <ComponentTitle title="Assinantes da Newsletter" type="h1" />
      <Box pb={5} display="flex" justifyContent="end">
        <Button
          gap={2}
          size="sm"
          variant="outline"
          colorScheme="green"
          onClick={() =>
            navigate("../write-newsletter-email", { relative: "path" })
          }
        >
          <RiMailSendLine size={20} /> Enviar email
        </Button>
      </Box>
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
