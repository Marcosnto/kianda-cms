import RequiredInput from "@/components/Forms/components/RequiredInput";
import LogoImage from "@/ui/LogoImage";
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
import useForgotPassword from "./forgot-password.hook";
import AlertStatus from "@/ui/AlertStatus";

const ForgotPassword = () => {
  const {
    navigate,
    register,
    handleSubmit,
    onSubmit,
    isPostForgotPasswordPending,
    hasPostForgotPasswordError,
    isValid,
    errors,
    isSubmitting,
  } = useForgotPassword();

  return (
    <Box background="green.900" h="100vh">
      <Center h="80vh" flexDirection="column" gap="6">
        <LogoImage pathRedirect="" />
        <Heading color="#FFF" size="md">
          Redefinição de Senha
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
            {hasPostForgotPasswordError && (
              <AlertStatus
                type="error"
                title="Ocorreu um erro!"
                description="Entre em contato com o suporte"
              />
            )}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">
                Insira seu e-mail <RequiredInput />
              </FormLabel>

              <Input
                id="email"
                type="text"
                {...register("email", {
                  required: "Esse Campo é obrigatório",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Formato de email incorreto",
                  },
                })}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <Flex flexDir="column" gap="3">
            <Button
              colorScheme="green"
              variant="solid"
              type="submit"
              width="100%"
              isDisabled={!isValid || isPostForgotPasswordPending}
              isLoading={isSubmitting || isPostForgotPasswordPending}
            >
              Confirmar
            </Button>
            <Button
              colorScheme="green"
              variant="outline"
              width="100%"
              isDisabled={isSubmitting}
              onClick={() => navigate("/")}
            >
              Voltar
            </Button>
          </Flex>
        </form>
      </Center>
    </Box>
  );
};

export default ForgotPassword;
