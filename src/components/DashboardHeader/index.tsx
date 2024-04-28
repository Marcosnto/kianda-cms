import useStore from "@/store";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu";
import AvatarMenu from "../AvatarMenu";

export default function DashboardHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setComponent } = useStore();

  return (
    <Box
      display="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      gap="4"
      boxShadow="sm"
      p="2.5"
    >
      <IconButton
        aria-label="Opções"
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={() => onOpen()}
        display={["unset", "unset", "none"]}
        _hover={{ bg: "green.700" }}
      />
      <Heading as="h1" size="md" noOfLines={1}>
        Kianda
      </Heading>
      <DrawerMenu
        onClose={onClose}
        isOpen={isOpen}
        setCurrentComponent={setComponent}
      />
      <AvatarMenu />
    </Box>
  );
}
