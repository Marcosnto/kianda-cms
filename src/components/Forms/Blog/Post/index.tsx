import { useToast } from "@chakra-ui/react";
import { useState } from "react";

import BlogPost from "./BlogPost";
import { Article } from "@/utils/types/blog";
import { BASE_API_URL } from "@/helpers/envs";

interface BlogPostType extends Omit<Article, "image"> {
  image: File[];
}

export default function Post() {
  const toast = useToast();
  const [resetForm, setResetForm] = useState(false);
  const token = localStorage.getItem("token");

  function post(data: BlogPostType) {
    const user = localStorage.getItem("user");

    const formData = new FormData();
    formData.append("userData", JSON.stringify(user));
    formData.append("postInfo", JSON.stringify(data));
    formData.append("image", data.image[0]);

    fetch(BASE_API_URL + "/article" || "", {
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
        setResetForm(true);
      } else {
        toast({
          title: `Ocorreu um erro no servidor`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    });
  }

  return (
    <BlogPost post={post} resetForm={resetForm} setResetForm={setResetForm} />
  );
}
