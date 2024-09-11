import { useRef } from "react";
import { Noop } from "react-hook-form";
import ReactQuill from "react-quill";

import useRichTextInput from "./rich-text-input.hook";

import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { Box, Progress, Text } from "@chakra-ui/react";

interface RichTextInputType {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: string;
}

const RichTextInput = ({ onChange, onBlur, value }: RichTextInputType) => {
  const quillRef = useRef(null);
  const { modules, isImageUploading } = useRichTextInput(quillRef);

  return (
    <>
      {isImageUploading ? (
        <Box pb={1}>
          <Text fontSize="sm">Carregando imagem</Text>
          <Progress size="xs" isIndeterminate colorScheme="green" />
        </Box>
      ) : null}
      <ReactQuill
        className="react-quill"
        value={value}
        ref={quillRef}
        onChange={onChange}
        onBlur={onBlur}
        modules={modules}
        readOnly={isImageUploading}
        placeholder="Escreva algo..."
      />
    </>
  );
};

export default RichTextInput;
