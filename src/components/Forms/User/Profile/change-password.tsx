import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import RequiredInput from "../../components/RequiredInput";
import PasswordInput from "@/ui/PasswordInput";
import useChangePassword from "./change-password.hook";
import ComponentTitle from "@/ui/Title";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    getValues,
    onSubmit,
    errors,
    isValid,
    isSubmitting,
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    navigate,
    isPostChangePasswordPending,
  } = useChangePassword();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ComponentTitle title="Redefinir Senha" type="h1" />
      <FormControl isInvalid={!!errors.currentPassword} mb="5">
        <FormLabel htmlFor="currentPassword">
          Senha atual <RequiredInput />
        </FormLabel>

        <PasswordInput
          id="currentPassword"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          register={register}
          objectRule={{
            required: "Esse Campo é obrigatório",
            validate: {
              equalPasswords: (value: unknown) =>
                getValues("currentPassword") === value ||
                "Senhas devem ser iguais",
            },
          }}
        />

        <FormErrorMessage>
          {errors.currentPassword && errors.currentPassword.message}
        </FormErrorMessage>
      </FormControl>

      <Stack spacing={8} direction="row" mb="10">
        <FormControl isInvalid={!!errors.newPassword}>
          <FormLabel htmlFor="newPassword">
            Nova Senha <RequiredInput />
          </FormLabel>

          <PasswordInput
            id="newPassword"
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
            register={register}
            objectRule={{
              required: "Esse Campo é obrigatório",
              validate: {
                equalPasswords: (value: unknown) =>
                  getValues("newPasswordCheck") === value ||
                  "Senhas devem ser iguais",
              },
            }}
          />

          <FormErrorMessage>
            {errors.newPassword && errors.newPassword.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.newPasswordCheck}>
          <FormLabel htmlFor="newPasswordCheck">
            Confirme a nova senha <RequiredInput />
          </FormLabel>

          <PasswordInput
            id="newPasswordCheck"
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
            register={register}
            objectRule={{
              required: "Esse Campo é obrigatório",
              validate: {
                equalPasswords: (value: unknown) =>
                  getValues("newPassword") === value ||
                  "Senhas devem ser iguais",
              },
            }}
          />

          <FormErrorMessage>
            {errors.newPasswordCheck && errors.newPasswordCheck.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <Flex flexDir="row" gap="5" justifyContent="space-around">
        <Button
          colorScheme="green"
          variant="outline"
          isDisabled={isSubmitting || isPostChangePasswordPending}
          onClick={() => navigate("/")}
        >
          Cancelar
        </Button>
        <Button
          colorScheme="green"
          variant="solid"
          type="submit"
          isDisabled={!isValid}
          isLoading={isSubmitting || isPostChangePasswordPending}
        >
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}
