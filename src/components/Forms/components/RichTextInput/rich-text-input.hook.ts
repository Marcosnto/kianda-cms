import { BASE_API_URL } from "@/helpers/envs";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useMemo } from "react";

function useRichTextInput(quillRef: React.MutableRefObject<null>) {
  const toast = useToast();

  const {
    mutate: uploadImage,
    data,
    isPending: isImageUploading,
  } = useMutation({
    mutationKey: ["postImage"],
    mutationFn: (file: FormData) =>
      axios({
        method: "post",
        url: `${BASE_API_URL}/images`,
        headers: { "Content-Type": "multipart/form-data" },
        data: file,
      }),
    onSuccess: (response) => {
      if (response.status == 200) {
        console.log("sucesso");
        embedImage(response.data[0]);
      }
    },
    onError: () => {
      toast({
        title: `Ocorreu um erro com a imagem`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    },
  });

  //@ts-ignore
  function embedImage(imageData) {
    //@ts-ignore
    const quill = quillRef?.current?.getEditor();
    const range = quill.getSelection();
    console.log(data);
    quill.insertEmbed(range.index, "image", imageData?.url);
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      //@ts-ignore
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      uploadImage(formData);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"], // Suporte para imagens
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return { modules, isImageUploading };
}

export default useRichTextInput;
