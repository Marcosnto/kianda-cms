//@ts-nocheck
import Quill from "quill";
import { BASE_API_URL } from "@/helpers/envs";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SizeStyle = Quill.import("attributors/style/size");
const BlockEmbed = Quill.import("blots/block/embed");
const Font = Quill.import("formats/font");
const fontWhitelist = [
  "arial",
  "helvetica",
  "verdana",
  "georgia",
  "times-new-roman",
  "courier-new",
  "roboto",
  "monospace",
];
Font.whitelist = fontWhitelist;

class CustomHtml5Video extends BlockEmbed {
  static blotName = "html5video";
  static tagName = "video";

  static create(value: string) {
    const node = super.create() as HTMLVideoElement;
    node.setAttribute("src", value);
    node.setAttribute("controls", "");
    node.setAttribute("controlsList", "nodownload");
    node.setAttribute("oncontextmenu", "return false");
    node.setAttribute(
      "style",
      "width: 100%; max-width: 560px; background: black;",
    );
    return node;
  }

  static value(node: HTMLVideoElement) {
    return node.getAttribute("src");
  }
}

SizeStyle.whitelist = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "13px",
  "14px",
  "16px",
  "18px",
  "24px",
  "36px",
  "48px",
  "60px",
];

Quill.register(SizeStyle, true);
Quill.register(Font, true);
Quill.register("formats/html5video", CustomHtml5Video);

function useRichTextInput(quillRef: React.MutableRefObject<null>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [videoUrl, setVideoUrl] = useState("");
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

  const { mutate: uploadFile, isPending: isImageUploading } = useMutation({
    mutationKey: ["postImage"],
    mutationFn: (file: FormData) =>
      axios.post(`${BASE_API_URL}/images`, file, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (response) => {
      if (response.status === 200) {
        const fileData = response.data[0];

        if (
          fileData.mime_type?.startsWith("video/") ||
          /\.(mp4|webm|ogg)$/i.test(fileData.file_name)
        ) {
          embedVideo(fileData);
        } else {
          embedImage(fileData);
        }

        setUploadedImages((prev) => [
          ...prev,
          {
            url: fileData.url,
            id: fileData.id,
            file_name: fileData.file_name,
          },
        ]);
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: `Ocorreu um erro com a upload`,
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

  function embedVideo(videoData) {
    const quill = quillRef?.current?.getEditor();
    const range = quill.getSelection();

    quill.insertEmbed(range.index, "html5video", videoData.url);
  }

  const fileHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*,video/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      uploadFile(formData);
    };
  }, []);

  const insertVideo = () => {
    const quill = quillRef?.current?.getEditor();
    const range = quill.getSelection(true);

    const youtubeMatch = videoUrl.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})/,
    );

    if (youtubeMatch && youtubeMatch[1]) {
      const embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      quill.insertEmbed(range.index, "video", embedUrl);
      onClose();
      setVideoUrl("");
    } else {
      alert("URL do YouTube inválida.");
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: fontWhitelist }],
          [{ size: SizeStyle.whitelist }],
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: fileHandler,
          video: onOpen,
        },
      },
    }),
    [],
  );

  return {
    modules,
    isImageUploading,
    isOpen,
    onOpen,
    onClose,
    videoUrl,
    setVideoUrl,
    insertVideo,
  };
}

export default useRichTextInput;
