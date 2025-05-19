import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu";
import AvatarMenu from "../AvatarMenu";

export default function DashboardHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        display={["flex", "flex", "none"]}
        _hover={{ bg: "green.700" }}
        color="white"
        fontSize="1.5rem"
      />
      <Heading as="h1" size="md" noOfLines={1}>
        Kianda
      </Heading>
      <DrawerMenu onClose={onClose} isOpen={isOpen} />
      <AvatarMenu />
    </Box>
  );
}
