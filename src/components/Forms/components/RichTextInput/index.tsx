import { useEffect, useRef } from "react";
import { Noop } from "react-hook-form";
import ReactQuill from "react-quill";

import useRichTextInput from "./rich-text-input.hook";

import "react-quill/dist/quill.snow.css";
import "./styles.css";
import {
  Box,
  Progress,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

interface RichTextInputType {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: string;
  resetImages?: boolean;
}

const RichTextInput = ({
  onChange,
  onBlur,
  value,
  resetImages,
}: RichTextInputType) => {
  const quillRef = useRef(null);
  const {
    modules,
    isImageUploading,
    isOpen,
    onClose,
    videoUrl,
    setVideoUrl,
    insertVideo,
    setUploadedImages,
    uploadedImagesRef,
  } = useRichTextInput(quillRef);

  useEffect(() => {
    // Reset uploaded images when resetImages prop changes
    // This is useful when you want to clear the images after a form submission or reset
    if (resetImages) {
      setUploadedImages([]);
      uploadedImagesRef.current = [];
    }
  }, [resetImages]);

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inserir vídeo do YouTube</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Cole a URL do vídeo do YouTube aqui"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              autoFocus
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={insertVideo}>
              Inserir vídeo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RichTextInput;
