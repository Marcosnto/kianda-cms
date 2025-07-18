import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import useRegisterHook from "./register.hook";
import { RegisterProps } from "@/utils/types/forms";
import ComponentTitle from "@/ui/Title";
import RequiredInput from "../../components/RequiredInput";
import registerTypes from "@/helpers/mocks/inputOptions/register-types";
import PasswordInput from "@/ui/PasswordInput";

function UserRegister() {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterProps>();

  const { onSubmit, showPassword, setShowPassword, isPostUserRegisterPending } =
    useRegisterHook({
      reset,
      isValid,
      getValues,
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ComponentTitle title="Cadastrar Usuário" type="h1" />
        <Flex flexDir="column" gap="5" mb="10">
          <FormControl isInvalid={!!errors.role}>
            <FormLabel htmlFor="role">
              Tipo de registro <RequiredInput />
            </FormLabel>

            <Select
              placeholder="Escolha uma opção"
              colorScheme="green"
              {...register?.("role", {
                required: "Esse campo é obrigatório",
              })}
            >
              {registerTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Select>

            <FormErrorMessage>
              {errors.role && errors.role.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.fullName}>
            <FormLabel htmlFor="fullName">
              Nome Completo <RequiredInput />
            </FormLabel>

            <Input
              id="fullName"
              type="text"
              {...register("fullName", {
                required: "Esse campo é obrigatório",
              })}
              focusBorderColor="green.800"
            />

            <FormErrorMessage>
              {errors.fullName && errors.fullName.message}
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={8} direction="row">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">
                Email <RequiredInput />
              </FormLabel>

              <Input
                id="email"
                type="text"
                {...register("email", {
                  required: "Esse Campo é obrigatório",
                  validate: {
                    equalEmails: (value) =>
                      getValues("emailCheck") === value ||
                      "Os emails devem ser iguais",
                  },
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

            <FormControl isInvalid={!!errors.emailCheck}>
              <FormLabel htmlFor="emailCheck">
                Confirme o Email <RequiredInput />
              </FormLabel>

              <Input
                id="emailCheck"
                type="text"
                {...register("emailCheck", {
                  required: "Esse Campo é obrigatório",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Formato de email incorreto",
                  },
                  validate: {
                    equalEmails: (value) =>
                      getValues("email") === value ||
                      "Os emails devem ser iguais",
                  },
                })}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.emailCheck && errors.emailCheck.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing={8} direction="row">
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">
                Senha <RequiredInput />
              </FormLabel>

              <PasswordInput
                id="password"
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
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.passwordCheck}>
              <FormLabel htmlFor="passwordCheck">
                Confirme a senha <RequiredInput />
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
          </Stack>
        </Flex>
        <Flex flexDir="row" gap="5" justifyContent="space-around">
          <Button colorScheme="green" variant="outline" onClick={() => reset()}>
            Limpar
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isPostUserRegisterPending}
          >
            Salvar
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default UserRegister;
