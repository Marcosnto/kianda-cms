import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import Menu from "../Menu";

export type DrawnerMenu = {
  onClose: () => void;
  isOpen: boolean;
};

export default function DrawerMenu({ onClose, isOpen }: DrawnerMenu) {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          borderBottomWidth="1px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Painel
          <IconButton
            _hover={{ bg: "green.600", color: "white" }}
            aria-label="Fechar menu lateral"
            icon={<SmallCloseIcon />}
            onClick={() => onClose()}
            background="none"
          />
        </DrawerHeader>
        <DrawerBody>
          <Menu onClose={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
