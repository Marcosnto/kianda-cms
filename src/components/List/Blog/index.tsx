//@ts-nocheck
import SpinnerLoad from "@/components/SpinnerLoad";
import { Box, Button, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";

import { apiError, noDataToShow } from "@/helpers/messages";
import { Article } from "./blog-list.types";
import getStatusBadge from "@/utils/getStatusBadge";
import ActionsButtons from "@/components/Forms/components/ActionsButton/ActionsButtons";
import { blogListOptions, blogTableHeaders } from "@/helpers/tableConfigs";
import ComponentTitle from "@/components/Title";
import TableList from "@/components/Table";
import FeedbackAPI from "@/components/FeedbackAPI";
import { useGetArticlesById } from "@/api/blog";
import { useNavigate } from "react-router-dom";

export default function PostsList() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const { blogPosts, error, isLoading, totalPages } = useGetArticlesById(
    currentPage,
    user.id,
  );

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  const tableBody = blogPosts?.map((article: Article) => (
    <Tr key={article.id}>
      <Td>{article.id}</Td>
      <Td>{article.title}</Td>
      <Td overflow="hidden" maxW="30ch" textOverflow="ellipsis">
        {article.description}
      </Td>
      <Td>{getStatusBadge(article.status)}</Td>
      <Td>
        <ActionsButtons tableOptions={blogListOptions} articleId={article.id} />
      </Td>
    </Tr>
  ));

  return (
    <>
      <ComponentTitle title="Artigos" type="h1" size="lg" />
      <Box pb={5} display="flex" justifyContent="end">
        <Button
          size="sm"
          variant="outline"
          colorScheme="green"
          onClick={() => navigate("../create-article", { relative: "path" })}
        >
          +
        </Button>
      </Box>
      {blogPosts.length > 0 ? (
        <>
          <TableList
            headers={blogTableHeaders}
            totalPages={totalPages}
            currentPage={currentPage}
            tableBody={tableBody}
            tableOptions={blogListOptions}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <FeedbackAPI message={noDataToShow} />
      )}
    </>
  );
}
