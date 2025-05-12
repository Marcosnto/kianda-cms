import { Box, Center } from "@chakra-ui/react";

import UserAutoRegister from "../components/Forms/User/AutoRegister";
import LogoImage from "../components/LogoImage";

export default function Register() {
  return (
    <Box background="green.900" height="100dvh">
      <title>Kianda - Registrar-se</title>

      <Center flexDirection="column" pt="15" pb="15" gap="5">
        <LogoImage pathRedirect="/login" />
        <UserAutoRegister />
      </Center>
    </Box>
  );
}
