import { BASE_API_URL } from "@/helpers/envs";
import { useCallback, useMemo, useRef } from "react";
import { Noop } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

interface RichTextInputType {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: string;
}

const RichTextInput = ({ onChange, onBlur, value }: RichTextInputType) => {
  const quillRef = useRef(null);

  const uploadImage = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(BASE_API_URL + "/images", {
      method: "POST",
      body: formData,
    });

    try {
      const data = await response.json();
      return data[0].url;
    } catch (error) {
      throw new Error("Something went wrong with image upload");
    }
  }, []);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      //@ts-ignore
      const file = input.files[0];

      const imageUrl = await uploadImage(file);

      //@ts-ignore
      const quill = quillRef?.current?.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", imageUrl);
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

  return (
    <ReactQuill
      className="react-quill"
      value={value}
      ref={quillRef}
      onChange={onChange}
      onBlur={onBlur}
      modules={modules}
      placeholder="Escreva algo..."
    />
  );
};

export default RichTextInput;
