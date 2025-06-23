import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Article } from "./blog-list.types";
import { handleUpdateArticleStatus } from "@/api/blog";

const useBlogList = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<
    string | number | null
  >(null);

  const {
    isOpen: isOpenUpdateArticleModal,
    onOpen: onOpenUpdateArticleModal,
    onClose: onCloseUpdateArticleModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const { updateArticleStatusFn, isUpArticleStatusPending } =
    handleUpdateArticleStatus();

  const {
    control: statusOptionsFormControl,
    handleSubmit: statusOptionsFormHandleSubmit,
    reset: statusOptionsFormReset,
    setValue,
    formState: {
      errors: statusOptionsFormErrors,
      isSubmitting: statusOptionsFormIsSubmitting,
    },
  } = useForm<Partial<Article>>({
    defaultValues: {
      status: "",
    },
  });

  const statusOptionsFormOnSubmit: SubmitHandler<Partial<Article>> =
    useCallback(
      (data) => {
        updateArticleStatusFn({
          id: data.id || "",
          status: data.status || "",
        });

        if (!statusOptionsFormIsSubmitting) {
          statusOptionsFormReset();
          onCloseUpdateArticleModal();
        }
      },
      [statusOptionsFormIsSubmitting, statusOptionsFormReset],
    );

  const onOpenModalUpdateArticle = useCallback(
    (modalInfo: { postId?: string | undefined }) => {
      setValue("id", String(modalInfo.postId) || "");
      onOpenUpdateArticleModal();
    },
    [onOpenUpdateArticleModal, setValue],
  );

  const onOpenModalDeleteArticle = useCallback(
    (modalInfo: { postId?: string | undefined }) => {
      setSelectedArticleId(modalInfo.postId || "");
      onOpenDeleteModal();
    },
    [onOpenUpdateArticleModal, setValue],
  );

  const modalsStateControl = {
    "update-article-status": onOpenModalUpdateArticle,
    "delete-article": onOpenModalDeleteArticle,
  };

  return {
    isOpenUpdateArticleModal,
    onCloseUpdateArticleModal,
    isOpenDeleteModal,
    onOpenDeleteModal,
    onCloseDeleteModal,
    modalsStateControl,
    statusOptionsFormErrors,
    statusOptionsFormControl,
    statusOptionsFormHandleSubmit,
    statusOptionsFormReset,
    statusOptionsFormIsSubmitting,
    statusOptionsFormOnSubmit,
    isUpArticleStatusPending,
    updateArticleStatusFn,
    selectedArticleId,
  };
};
export default useBlogList;
