//@ts-nocheck
import { BASE_API_URL } from "@/helpers/envs";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function useRichTextInput(quillRef: React.MutableRefObject<null>) {
  const toast = useToast();
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ id: number | string; url: string; file_name: string }>
  >([]);

  const uploadedImagesRef = useRef(uploadedImages);

  useEffect(() => {
    uploadedImagesRef.current = uploadedImages;
  }, [uploadedImages]);

  useEffect(() => {
    const quill = quillRef?.current?.getEditor?.();
    const editor = quill?.root;

    if (!editor) return;

    const observer = new MutationObserver(() => {
      const currentSrcs = Array.from(editor.querySelectorAll("img")).map(
        (img) => img.getAttribute("src"),
      );

      const previous = uploadedImagesRef.current;

      if (currentSrcs.length >= previous.length) return;

      const removedImages = previous.filter(
        (img) => !currentSrcs.includes(img.url),
      );

      setUploadedImages(
        previous.filter((img) => currentSrcs.includes(img.url)),
      );

      removedImages.forEach((img) => {
        axios.delete(`${BASE_API_URL}/images/${img.id}`).catch(() => {
          toast({
            title: "Erro ao remover imagem",
            status: "warning",
            position: "top",
            isClosable: true,
          });
        });
      });
    });

    observer.observe(editor, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [quillRef]);

  const { mutate: uploadImage, isPending: isImageUploading } = useMutation({
    mutationKey: ["postImage"],
    mutationFn: (file: FormData) =>
      axios.post(`${BASE_API_URL}/images`, file, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (response) => {
      if (response.status === 200) {
        const image = response.data[0];

        embedImage(image);
        setUploadedImages((prev) => [
          ...prev,
          {
            url: image.url,
            id: image.id,
            file_name: image.file_name,
          },
        ]);
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

  function embedImage(imageData) {
    const quill = quillRef?.current?.getEditor();
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", imageData?.url);
  }

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
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
          ["link", "image"],
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
