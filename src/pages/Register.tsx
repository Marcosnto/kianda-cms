import { Box, Center } from "@chakra-ui/react";
import Head from "next/head";

import LogoImage from "../components/LogoImage";
import UserAutoRegister from "../components/Forms/User/AutoRegister";

export default function Register() {
  return (
    <Box background="green.900">
      <Head>
        <title>Kianda - Registrar-se</title>
      </Head>
      <Center flexDirection="column" pt="15" pb="15" gap="5">
        <LogoImage pathRedirect="/login" />
        <UserAutoRegister />
      </Center>
    </Box>
  );
}
