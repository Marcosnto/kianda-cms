import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";

import SpinnerLoad from "../../SpinnerLoad";
import { apiError, noDataToShow } from "../../../helpers/messages";
import {
  blogListOptions,
  blogTableHeaders,
} from "../../../helpers/tableConfigs";
import { Article } from "./blog-list.types";
import useBlogList from "./blog-list.hook";
import getStatusBadge from "../../../utils/getStatusBadge";

import FeedbackAPI from "../../FeedbackAPI";
import TableList from "../../Table";
import ComponentTitle from "../../Title";
import ButtonsActions from "../../Forms/components/ActionsButton/ActionsButtons";

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
