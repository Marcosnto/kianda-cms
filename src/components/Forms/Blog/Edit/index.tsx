import SpinnerLoad from "@/components/SpinnerLoad";
import { BASE_API_URL } from "@/helpers/envs";
import { apiError } from "@/helpers/messages";
import { Article } from "@/utils/types/blog";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditBlogPostForm } from "./EditBlogPostForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export default function EditBlogPost() {
  let { articleID } = useParams();
  const toast = useToast();
  const token = localStorage.getItem("token");

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
      content: "",
      description: "",
      image: undefined,
      imageDescription: "",
      imageSub: "",
      status: "",
    },
  });

  const onSubmit: SubmitHandler<Article> = (e) => {
    const formData = new FormData();
    formData.append("postInfo", JSON.stringify(e));

    fetch(BASE_API_URL + `/article/${articleID}` || "", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((response) => {
      if (response.ok) {
        toast({
          title: `Artigo publicado com sucesso!`,
          position: "top",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: `Ocorreu um erro no servidor`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["editPost"],
    queryFn: () =>
      fetch(BASE_API_URL + `/article/${articleID}` || "", {
        method: "GET",
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Ocorreu um erro ao obter os dados");
        }
      }),
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        author: data.author,
        content: data.content,
        description: data.description,
        image: data.image,
        imageDescription: data.imageDescription,
        imageSub: data.imageSub,
        status: data.status,
      });
    }
  }, [data]);

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  return (
    <EditBlogPostForm
      data={data}
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      reset={reset}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}
