import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";

import getStatusBadge from "../../../utils/getStatusBadge";
import { apiError, noDataToShow } from "../../../utils/helpers/messages";
import {
  blogListOptions,
  blogTableHeaders,
} from "../../../utils/helpers/tableConfigs";
import FeedbackAPI from "../../FeedbackAPI";
import ButtonsActions from "../../Forms/components/ActionsButton/ActionsButtons";
import SpinnerLoad from "../../SpinnerLoad";
import TableList from "../../Table";
import ComponentTitle from "../../Title";
import useBlogList from "./blog-list.hook";
import { Article } from "./blog-list.types";

export default function PostsList() {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { blogPosts, error, isLoading, totalPages } = useBlogList(currentPage);

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  const tableBody = blogPosts?.map((post: Article) => (
    <Tr key={post.id}>
      <Td>{post.id}</Td>
      <Td>{post.title}</Td>
      <Td overflow="hidden" maxW="30ch" textOverflow="ellipsis">
        {post.description}
      </Td>
      <Td>{getStatusBadge(post.status)}</Td>
      <Td>
        <ButtonsActions tableOptions={blogListOptions} id={post.id} />
      </Td>
    </Tr>
  ));

  return (
    <>
      {blogPosts.length > 0 ? (
        <>
          <ComponentTitle title="Artigos" type="h1" size="lg" />
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
