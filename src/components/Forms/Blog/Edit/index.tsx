import SpinnerLoad from "@/components/SpinnerLoad";
import useStore from "@/store";
import { BASE_URL } from "@/helpers/envs";
import { apiError } from "@/helpers/messages";
import { Article } from "@/utils/types/blog";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { EditBlogPostForm } from "./EditBlogPostForm";

export default function EditBlogPost() {
  const { currentSelectedUser } = useStore();

  //TODO: this is wrong, create a store to handle with the blog components
  const currentSelectedID = currentSelectedUser?.id;

  const {
    register,
    handleSubmit,
    reset,
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["editPost"],
    queryFn: () =>
      fetch(BASE_URL + `/article/${currentSelectedID}` || "", {
        method: "GET",
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Ocorreu um erro ao obter os dados");
        }
      }),
  });

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
      handleSubmit={handleSubmit}
      reset={reset}
      errors={errors}
    />
  );
}
