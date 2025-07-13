import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

import { noDataToShow } from "../../helpers/messages";
import Pagination from "../../ui/Pagination";
import { TableHeadersProps, TableListProps } from "./table.types";

export default function TableList({
  headers,
  totalPages,
  currentPage,
  tableBody,
  setCurrentPage,
}: TableListProps) {
  return (
    <>
      {tableBody ? (
        <>
          <TableContainer>
            <Table variant="striped" size="md" colorScheme="green">
              <Thead>
                <Tr>
                  {headers.map((header: TableHeadersProps) => (
                    <Th key={header.key}>{header.name}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>{tableBody}</Tbody>
            </Table>
          </TableContainer>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />{" "}
        </>
      ) : (
        <h1>{noDataToShow}</h1>
      )}
    </>
  );
}
