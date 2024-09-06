import { useToast } from "@chakra-ui/react";
import { useState } from "react";

import BlogPost from "./BlogPost";
import { Article } from "@/utils/types/blog";
import { BASE_API_URL } from "@/helpers/envs";

function getImagesFromContent(
  content: string,
  formData: FormData,
  promises: Promise<void>[],
) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  // Obter todas as imagens no conteúdo
  const images = doc.querySelectorAll("img");

  images.forEach((img, index) => {
    const src = img.getAttribute("src");

    if (src?.startsWith("blob:")) {
      const blobFile = fetch(src)
        .then((response) => response.blob())
        .then((blob) => {
          console.log(blob);
          const file = new File([blob], img.alt, { type: blob.type });
          formData.append(`text_image_${index}`, file);
        })
        .catch((error) => {
          console.error("Erro ao buscar blob:", error);
        });

      promises.push(blobFile);
    }
  });
}

export default function Post() {
  const toast = useToast();
  const promises: Promise<void>[] = [];
  const [resetForm, setResetForm] = useState(false);

  function post(data: Article) {
    const formData = new FormData();

    formData.append("postInfo", JSON.stringify(data));
    formData.append("image", data.image[0]);

    getImagesFromContent(data.content, formData, promises);

    Promise.all(promises).then(() => {
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
    });
  }

  return (
    <BlogPost post={post} resetForm={resetForm} setResetForm={setResetForm} />
  );
}
