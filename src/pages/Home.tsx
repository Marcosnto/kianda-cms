import { Box, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/login"), 3000);
  }, []);

  return (
    <Box bg="#1A240F">
      <Center h="100vh" w="100%" color="#FFFF" textAlign="center">
        <p>
          Estamos trabalhando nesta página!
          <br />
          Em alguns segundos você será redirecionado para página de login :)
        </p>
      </Center>
    </Box>
  );
}
