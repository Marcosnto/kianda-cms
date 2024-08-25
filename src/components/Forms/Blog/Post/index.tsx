import { useToast } from "@chakra-ui/react";
import { useState } from "react";

import BlogPost from "./BlogPost";
import { Article } from "@/utils/types/blog";
import { BASE_API_URL } from "@/helpers/envs";

export default function Post() {
  const toast = useToast();
  const [resetForm, setResetForm] = useState(false);

  function post(data: Article) {
    const formData = new FormData();

    formData.append("postInfo", JSON.stringify(data));
    formData.append("image", data.image[0]);

    fetch(BASE_API_URL + "/article" || "", {
      method: "POST",
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

    // fetch(BASE_API_URL + "/article" || "", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: data.title,
    //     author: data.author,
    //     description: data.description,
    //     content: data.content,
    //     slug: data.slug,
    //     files: data.image[0],
    //     imageDescription: data.imageDescription,
    //     imageSub: data.imageSub,
    //   }),
    // }).then((response) => {
    //   if (response.ok) {
    //     toast({
    //       title: `Artigo publicado com sucesso!`,
    //       position: "top",
    //       status: "success",
    //       isClosable: true,
    //     });
    //     setResetForm(true);
    //   } else {
    //     toast({
    //       title: `Ocorreu um erro no servidor`,
    //       position: "top",
    //       status: "error",
    //       isClosable: true,
    //     });
    //   }
    // });
  }

  return (
    <BlogPost post={post} resetForm={resetForm} setResetForm={setResetForm} />
  );
}
