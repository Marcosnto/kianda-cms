import { Box, Center } from "@chakra-ui/react";

import UserAutoRegister from "../components/Forms/User/AutoRegister";
import LogoImage from "../ui/LogoImage";

export default function Register() {
  return (
    <Box background="green.900" minH="100vh">
      <Center flexDirection="column" pt="15" pb="15" gap="5" h="100%">
        <LogoImage pathRedirect="/login" />
        <UserAutoRegister />
      </Center>
    </Box>
  );
}
