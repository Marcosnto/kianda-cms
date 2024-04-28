import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type GenericModalTypes = {
  isOpen: boolean;
  onClose: () => void;
  onEsc?: () => void;
  onConfirm?: () => void;
  content: string | JSX.Element;
  title: string;
  isLoading?: boolean;
  colorSchemeCancel?: string;
  colorSchemeConfirm?: string;
  btnConfirmLabel?: string;
  btnCancelLabel?: string;
};

export function GenericModal({
  isOpen,
  onClose,
  onEsc,
  onConfirm,
  content,
  title,
  isLoading,
  colorSchemeCancel = "green",
  colorSchemeConfirm = "green",
  btnCancelLabel = "Cancelar",
  btnConfirmLabel = "Confirmar",
}: GenericModalTypes) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onEsc={onEsc}
      blockScrollOnMount
      closeOnEsc
      closeOnOverlayClick={false}
      colorScheme="green"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>

        <ModalFooter>
          <Button
            colorScheme={colorSchemeCancel}
            mr={3}
            size="sm"
            variant="outline"
            onClick={onClose}
          >
            {btnCancelLabel}
          </Button>
          <Button
            colorScheme={colorSchemeConfirm}
            type="submit"
            size="sm"
            mr={3}
            onClick={onConfirm ?? onClose}
            isLoading={isLoading}
          >
            {btnConfirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
