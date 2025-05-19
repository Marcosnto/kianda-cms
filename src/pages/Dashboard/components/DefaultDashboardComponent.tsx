import { Center, Text } from "@chakra-ui/react";

export default function DefaultDashboardComponent() {
  const loggedUser = JSON.parse(localStorage.getItem("user") || "");
  const userRole = !!loggedUser?.role;

  return (
    <Center h="80vh" display="flex" flexDir="column" gap={4}>
      <Text fontSize="3xl">Boas vindas!</Text>
      {userRole ? (
        <p>Selecione uma opção ao lado</p>
      ) : (
        <>
          <p>Você ainda não possui uma função no sistema.</p>
          <p>Entre em contato com o administrador.</p>
        </>
      )}
    </Center>
  );
}
