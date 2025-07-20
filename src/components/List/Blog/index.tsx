import SpinnerLoad from "@/ui/SpinnerLoad";
import { Box, Button, Td, Text, Tr } from "@chakra-ui/react";
import { useState } from "react";

import { apiError, noDataToShow } from "@/helpers/messages";
import { Article } from "./blog-list.types";
import getStatusBadge from "@/utils/getStatusBadge";
import ActionsButtons from "@/components/Forms/components/ActionsButton/ActionsButtons";
import {
  blogListOptions,
  blogTableHeaders,
} from "@/helpers/tableOptionsConfigs";
import ComponentTitle from "@/ui/Title";
import TableList from "@/ui/Table";
import FeedbackAPI from "@/ui/FeedbackAPI";
import { getArticlesById } from "@/api/blog";
import { useNavigate } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { GenericModal } from "@/ui/GenericModal";

import useBlogList from "./blog-list.hook";

import ArticleStatusOptions from "@/components/List/Blog/components/ArticleStatus";
import useUserStore from "@/store/userStore";

export default function PostsList() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  //@ts-ignore
  const { loggedUser } = useUserStore();
  const navigate = useNavigate();
  const {
    isOpenUpdateArticleModal,
    onCloseUpdateArticleModal,
    isOpenDeleteModal,
    onCloseDeleteModal,
    modalsStateControl,
    statusOptionsFormErrors,
    statusOptionsFormControl,
    statusOptionsFormHandleSubmit,
    statusOptionsFormIsSubmitting,
    statusOptionsFormOnSubmit,
    isUpArticleStatusPending,
    updateArticleStatusFn,
    selectedArticleId,
  } = useBlogList();

  const { blogPosts, error, isLoading, totalPages } = getArticlesById(
    currentPage,
    String(loggedUser!.id),
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
        <ActionsButtons
          tableOptions={blogListOptions}
          articleId={article.id}
          articleStatus={article.status}
          modalsOptions={modalsStateControl}
        />
      </Td>
    </Tr>
  ));

  const ContentUpdateArticle = () => {
    return (
      <form>
        <ArticleStatusOptions
          errors={statusOptionsFormErrors}
          control={statusOptionsFormControl}
        />
      </form>
    );
  };

  const ContentArchiveRegistration = () => {
    return (
      <div>
        <Text>
          Gostaria mesmo de{" "}
          <Text as="b" color="red">
            deletar
          </Text>{" "}
          o artigo?
          <br />
          <br />
          Ele não ficará visível para os leitores e, após 30 dias, será
          permanentemente deletado.
        </Text>
      </div>
    );
  };

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
          <MdOutlinePostAdd size={20} />
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
          <GenericModal
            title={`Situação do Artigo`}
            isOpen={isOpenUpdateArticleModal}
            onClose={onCloseUpdateArticleModal}
            content={<ContentUpdateArticle />}
            isLoading={
              statusOptionsFormIsSubmitting || isUpArticleStatusPending
            }
            onConfirm={statusOptionsFormHandleSubmit(statusOptionsFormOnSubmit)}
          />
          <GenericModal
            title="Deletar Artigo"
            isOpen={isOpenDeleteModal}
            onClose={onCloseDeleteModal}
            btnConfirmLabel="Deletar"
            colorSchemeConfirm="red"
            content={<ContentArchiveRegistration />}
            onConfirm={() => {
              updateArticleStatusFn({ id: selectedArticleId, status: "trash" });
              onCloseDeleteModal();
            }}
          />
        </>
      ) : (
        <FeedbackAPI message={noDataToShow} />
      )}
    </>
  );
}
