import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getArticle, handlePostArticle } from "@/api/blog";

import { EditBlogPostForm } from "./EditBlogPostForm";
import SpinnerLoad from "@/ui/SpinnerLoad";
import { apiError } from "@/helpers/messages";

import { Article } from "@/utils/types/blog";
import { useToast } from "@chakra-ui/react";

export default function EditBlogPost() {
  let { articleID } = useParams();

  const toast = useToast();

  const {
    postArticleFn,
    isPostArticleError,
    isPostArticlePending,
    isPostArticleSuccess,
  } = handlePostArticle(articleID);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Article>({
    defaultValues: {
      title: "",
      author: "",
      columnType: "",
      content: "",
      subtitle: "",
      image: undefined,
      imageDescription: "",
      imageSub: "",
      status: "",
      slug: "",
    },
  });

  const onSubmit: SubmitHandler<Article> = (data) => {
    const formData = new FormData();
    console.log("data", data);
    formData.append("postInfo", JSON.stringify(data));

    postArticleFn(formData);
  };

  const { articleData, isGetArticleLoading, isGetArticleError } =
    getArticle(articleID);

  useEffect(() => {
    if (articleData) {
      reset({
        title: articleData.title,
        author: articleData.author,
        content: articleData.content,
        subtitle: articleData.description,
        image: articleData.image,
        imageDescription: articleData.imageDescription,
        imageSub: articleData.imageSub,
        status: articleData.status,
        columnType: articleData.columnType,
        slug: articleData.slug,
      });
    }
  }, [articleData]);

  if (isPostArticleSuccess) {
    toast({
      title: `Artigo publicado com sucesso!`,
      position: "top",
      status: "success",
      isClosable: true,
    });
  }

  if (isPostArticleError) {
    toast({
      title: `Ocorreu um erro no servidor`,
      position: "top",
      status: "error",
      isClosable: true,
    });
  }

  if (isPostArticlePending) {
    console.log("carregando post article...");
  }

  if (isGetArticleLoading) {
    return <SpinnerLoad />;
  }

  if (isGetArticleError) {
    return <h1>{apiError}</h1>;
  }

  return (
    <EditBlogPostForm
      data={articleData}
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      reset={reset}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}
