import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useAutoRegister from "./auto-register.hook";
import { RegisterProps } from "../../../../utils/types/forms";
import SpinnerLoad from "../../../SpinnerLoad";
import ComponentTitle from "../../../Title";
import RequiredInput from "../../components/RequiredInput";
import pronounsTypes from "../../../../utils/mocks/inputOptions/pronounsTypes";
import { GenericModal } from "../../../GenericModal";

function UserAutoRegister() {
  const {
    isSendingEmail,
    privacyPolicyLink,
    useTermsLink,
    modalStatus,
    post,
    onModalClose,
    navigate,
  } = useAutoRegister();
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterProps>();

  const onSubmit: SubmitHandler<RegisterProps> = useCallback(
    (data) => {
      if (isValid) {
        post(data);
      }
    },
    [isValid, post],
  );

  const watched = watch(["gender", "disabledPerson"]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "#FFF",
          padding: "2rem",
          border: "1px solid #1A240F",
          borderRadius: "6px",
        }}
      >
        {isSendingEmail ? (
          <SpinnerLoad height="68vh" width="60vh" />
        ) : (
          <>
            <ComponentTitle title="Criar conta" type="h1" />
            <Flex flexDir="column" gap="5" mb="10">
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

                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Esse Campo é obrigatório",
                      validate: {
                        equalPasswords: (value) =>
                          getValues("passwordCheck") === value ||
                          "Senhas devem ser iguais",
                      },
                    })}
                    focusBorderColor="green.800"
                  />

                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.passwordCheck}>
                  <FormLabel htmlFor="passwordCheck">
                    Confirme a senha <RequiredInput />
                  </FormLabel>

                  <Input
                    id="passwordCheck"
                    type="password"
                    {...register("passwordCheck", {
                      required: "Esse Campo é obrigatório",
                      validate: {
                        equalPasswords: (value) =>
                          getValues("password") === value ||
                          "Senhas devem ser iguais",
                      },
                    })}
                    focusBorderColor="green.800"
                  />

                  <FormErrorMessage>
                    {errors.passwordCheck && errors.passwordCheck.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <FormControl isInvalid={!!errors.bornDate}>
                <FormLabel htmlFor="bornDate">
                  Data de Nascimento <RequiredInput />
                </FormLabel>
                <Input
                  id="bornDate"
                  type="date"
                  {...register("bornDate", {
                    required: "Esse Campo é obrigatório",
                  })}
                  focusBorderColor="green.800"
                />

                <FormErrorMessage>
                  {errors.bornDate && errors.bornDate.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={8} direction="row">
                <FormControl isInvalid={!!errors.gender}>
                  <FormLabel htmlFor="gender">
                    Gênero <RequiredInput />
                  </FormLabel>
                  <RadioGroup id="gender" colorScheme="green">
                    <Stack direction="row">
                      <Radio
                        value="1"
                        {...register("gender", {
                          required: "Esse Campo é obrigatório",
                        })}
                      >
                        Cis
                      </Radio>
                      <Radio
                        value="2"
                        {...register("gender", {
                          required: "Esse Campo é obrigatório",
                        })}
                      >
                        Trans
                      </Radio>
                      <Radio
                        value="3"
                        {...register("gender", {
                          required: "Esse Campo é obrigatório",
                        })}
                      >
                        Outro
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  <FormErrorMessage>
                    {errors.gender && errors.gender.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.pronouns}>
                  <FormLabel htmlFor="pronouns">
                    Pronomes <RequiredInput />
                  </FormLabel>

                  <Select
                    id="pronouns"
                    placeholder="Selecione uma opção"
                    defaultValue={0}
                    {...register("pronouns", {
                      required: "Esse Campo é obrigatório",
                    })}
                    colorScheme="green"
                  >
                    {pronounsTypes.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.pronouns && errors.pronouns.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              {watched[0] === "3" ? (
                <FormControl isInvalid={!!errors.otherGender}>
                  <FormLabel htmlFor="otherGender">
                    Informe o gênero <RequiredInput />:
                  </FormLabel>
                  <Input
                    id="otherGender"
                    type="text"
                    {...register("otherGender", {
                      required: "Esse Campo é obrigatório",
                    })}
                    focusBorderColor="green.800"
                  />

                  <FormErrorMessage>
                    {errors.otherGender && errors.otherGender.message}
                  </FormErrorMessage>
                </FormControl>
              ) : null}

              <FormControl isInvalid={!!errors.disabledPerson}>
                <FormLabel htmlFor="disabledPerson">
                  É uma pessoa com deficiência? <RequiredInput />
                </FormLabel>
                <RadioGroup id="disabledPerson" colorScheme="green">
                  <Stack direction="row">
                    <Radio
                      value="true"
                      {...register("disabledPerson", {
                        required: "Esse Campo é obrigatório",
                      })}
                    >
                      Sim
                    </Radio>
                    <Radio
                      value="false"
                      {...register("disabledPerson", {
                        required: "Esse Campo é obrigatório",
                      })}
                    >
                      Não
                    </Radio>
                  </Stack>
                </RadioGroup>

                <FormErrorMessage>
                  {errors.disabledPerson && errors.disabledPerson.message}
                </FormErrorMessage>
              </FormControl>

              {watched[1] === "true" ? (
                <FormControl isInvalid={!!errors.disabledPersonDescription}>
                  <FormLabel htmlFor="disabledPersonDescription">
                    Informe a deficiência: <RequiredInput />:
                  </FormLabel>
                  <Input
                    id="disabledPersonDescription"
                    type="text"
                    {...register("disabledPersonDescription", {
                      required: "Esse Campo é obrigatório",
                    })}
                    focusBorderColor="green.800"
                  />

                  <FormErrorMessage>
                    {errors.disabledPersonDescription &&
                      errors.disabledPersonDescription.message}
                  </FormErrorMessage>
                </FormControl>
              ) : null}

              <FormControl isInvalid={!!errors.acceptTerm}>
                <Checkbox
                  colorScheme="green"
                  {...register("acceptTerm", {
                    required: "Esse Campo é obrigatório",
                  })}
                >
                  Li e concordo os{" "}
                  <Link
                    as={NextLink}
                    href={useTermsLink}
                    isExternal
                    colorScheme="green"
                    textDecoration={"underline"}
                  >
                    Termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    as={NextLink}
                    href={privacyPolicyLink}
                    isExternal
                    colorScheme="green"
                    textDecoration={"underline"}
                  >
                    Políticas de Privacidade
                  </Link>
                </Checkbox>
                <FormErrorMessage>
                  {errors.acceptTerm && errors.acceptTerm.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir="column" gap="3">
              <Button
                colorScheme="green"
                variant="solid"
                type="submit"
                width="100%"
                isLoading={isSubmitting}
              >
                Confirmar
              </Button>
              <Button
                colorScheme="green"
                variant="outline"
                width="100%"
                onClick={() => navigate("/login")}
              >
                Cancelar
              </Button>
            </Flex>
          </>
        )}
      </form>
      <GenericModal
        title="Confirmação de cadastro"
        isOpen={modalStatus}
        onEsc={onModalClose}
        onClose={onModalClose}
        content="Seu cadastro foi realizado com sucesso e foi enviado para aprovação. Você será notificado por email assim que o seu status for atualizado."
        btnConfirmLabel="Confirmar"
      />
    </>
  );
}

export default UserAutoRegister;
