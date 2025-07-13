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

import AlertStatus from "../../ui/AlertStatus";
import RequiredInput from "../../components/Forms/components/RequiredInput";
import LogoImage from "../../ui/LogoImage";
import useLogin from "./login.hook";
import { LoginProps } from "./types";
import PasswordInput from "@/ui/PasswordInput";

export default function Login() {
  const {
    isErrorLogin,
    isPendingLogin,
    isSucessLogin,
    registerStatus,
    navigate,
    loginFn,
    showPassword,
    setShowPassword,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    loginFn(data);
  };

  if (isSucessLogin && registerStatus === 1) {
    setTimeout(() => navigate("/dashboard"), 100);
  }

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
              {/* TODO: Trate the Error rerturned by API */}
              {isErrorLogin ? (
                <AlertStatus
                  type="error"
                  title="Ocorreu um erro!"
                  description="Entre em contato com o suporte."
                />
              ) : null}
              {isErrorLogin ? (
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

                <PasswordInput
                  id="password"
                  objectRule={{ required: "Esse Campo é obrigatório" }}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  register={register}
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
                isLoading={isPendingLogin}
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
