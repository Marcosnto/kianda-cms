//@ts-nocheck
import SpinnerLoad from "@/components/SpinnerLoad";
import { Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import useBlogList from "./blog-list.hook";
import { apiError, noDataToShow } from "@/helpers/messages";
import { Article } from "./blog-list.types";
import getStatusBadge from "@/utils/getStatusBadge";
// import ButtonsActions from "@/components/Forms/components/ActionsButton/ActionsButtons";
import { blogListOptions, blogTableHeaders } from "@/helpers/tableConfigs";
import ComponentTitle from "@/components/Title";
import TableList from "@/components/Table";
import FeedbackAPI from "@/components/FeedbackAPI";

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
        {/* <ButtonsActions tableOptions={blogListOptions} id={post.id} /> */}
      </Td>
    </Tr>
  ));

  return (
    <>
      {blogPosts.length > 0 ? (
        <>
          <ComponentTitle title="Artigos" type="h1" size="lg" />
          {/* <TableList
            headers={blogTableHeaders}
            totalPages={totalPages}
            currentPage={currentPage}
            tableBody={tableBody}
            tableOptions={blogListOptions}
            setCurrentPage={setCurrentPage}
          /> */}
        </>
      ) : (
        <FeedbackAPI message={noDataToShow} />
      )}
    </>
  );
}
