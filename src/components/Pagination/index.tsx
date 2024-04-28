import { Button, Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export type PaginationProps = {
  totalPages: number | undefined;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  function paginationButton(number: number) {
    return (
      <Button
        border="solid 1px #35481E"
        color="green.700"
        w="6"
        _hover={{ bg: "green.600", rounded: "8px", color: "white" }}
        key={`page ${number}`}
        variant={currentPage === number ? "solid" : "outline"}
        onClick={(e) => {
          const pageNumber = e.target as HTMLButtonElement;
          setCurrentPage(+pageNumber.innerText);
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Flex gap={2} justifyContent="center" mt="5">
      {[...Array(totalPages)].map((_, index) => paginationButton(index + 1))}
    </Flex>
  );
}

export default Pagination;
