import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import AlertStatus from "../../components/AlertStatus";
import RequiredInput from "../../components/Forms/components/RequiredInput";
import LogoImage from "../../components/LogoImage";
import useLogin from "./login.hook";
import { LoginProps } from "./types";

export default function Login() {
  const {
    apiError,
    authError,
    // isAuth,
    registerStatus,
    navigate,
    setApiError,
    login,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    setApiError(false);
    login(data);
  };

  return (
    <>
      <Box background="green.900" h="100vh">
        <Center h="80vh" flexDirection="column" gap="6">
          <LogoImage pathRedirect="" />
          <Heading color="#FFF" size="md">
            Fazer Login
          </Heading>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              background: "#FFF",
              padding: "2rem",
              border: "1px solid #1A240F",
              borderRadius: "6px",
              maxWidth: "400px",
            }}
          >
            <Flex flexDir="column" gap="4" mb="5" alignItems="center">
              {apiError ? (
                <AlertStatus
                  type="error"
                  title="Ocorreu um erro!"
                  description="Entre em contato com o suporte."
                />
              ) : null}
              {authError ? (
                <AlertStatus
                  type="error"
                  description="Email ou senha incorretos"
                />
              ) : null}
              {registerStatus === "0" ? (
                <AlertStatus
                  type="warning"
                  description="Seu cadastro ainda está pendente de aprovação"
                />
              ) : null}
              {registerStatus === "2" ? (
                <AlertStatus
                  type="error"
                  description="Seu cadastro está suspenso, entre em contato com o suporte"
                />
              ) : null}
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">
                  Email <RequiredInput />
                </FormLabel>

                <Input
                  id="email"
                  type="text"
                  // disabled={isAuth}
                  {...register("email", {
                    required: "Esse Campo é obrigatório",
                  })}
                  focusBorderColor="green.900"
                />

                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">
                  Senha <RequiredInput />
                </FormLabel>

                <Input
                  id="password"
                  type="password"
                  // disabled={isAuth}
                  {...register("password", {
                    required: "Esse Campo é obrigatório",
                  })}
                  focusBorderColor="green.800"
                />

                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir="column" gap="3">
              <Button
                colorScheme="green"
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                width="100%"
              >
                Entrar
              </Button>
              <Button
                colorScheme="green"
                variant="outline"
                width="100%"
                onClick={() => navigate("/register")}
              >
                Registra-se
              </Button>
            </Flex>
          </form>
        </Center>
      </Box>
    </>
  );
}
