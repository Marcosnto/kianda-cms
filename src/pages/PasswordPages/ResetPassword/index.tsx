import RequiredInput from "@/components/Forms/components/RequiredInput";
import LogoImage from "@/ui/LogoImage";
import PasswordInput from "@/ui/PasswordInput";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import useResetPassword from "./reset-password.hook";

const ResetPassword = () => {
  const {
    navigate,
    getValues,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    isValid,
    errors,
    isSubmitting,
  } = useResetPassword();

  return (
    <Box background="green.900" h="100vh">
      <Center h="80vh" flexDirection="column" gap="6">
        <LogoImage pathRedirect="" />
        <Heading color="#FFF" size="md">
          Redefinir Senha
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
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">
                Nova Senha <RequiredInput />
              </FormLabel>

              <PasswordInput
                id="password"
                objectRule={{
                  required: "Esse Campo é obrigatório",
                  validate: {
                    equalPasswords: (value: unknown) =>
                      getValues("passwordCheck") === value ||
                      "Senhas devem ser iguais",
                  },
                }}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
              />

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.passwordCheck}>
              <FormLabel htmlFor="passwordCheck">
                Confirme a nova senha <RequiredInput />
              </FormLabel>

              <PasswordInput
                id="passwordCheck"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                register={register}
                objectRule={{
                  required: "Esse Campo é obrigatório",
                  validate: {
                    equalPasswords: (value: unknown) =>
                      getValues("passwordCheck") === value ||
                      "Senhas devem ser iguais",
                  },
                }}
              />

              <FormErrorMessage>
                {errors.passwordCheck && errors.passwordCheck.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <Flex flexDir="column" gap="3">
            <Button
              colorScheme="green"
              variant="solid"
              type="submit"
              width="100%"
              isDisabled={!isValid}
              isLoading={isSubmitting}
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
              Cancelar
            </Button>
          </Flex>
        </form>
      </Center>
    </Box>
  );
};

export default ResetPassword;
