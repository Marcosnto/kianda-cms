import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useAutoRegister from "./auto-register.hook";
import { RegisterProps } from "@/utils/types/forms";
import SpinnerLoad from "@/ui/SpinnerLoad";
import ComponentTitle from "@/ui/Title";
import RequiredInput from "../../components/RequiredInput";
import { GenericModal } from "@/ui/GenericModal";
import pronounsTypes from "@/helpers/mocks/inputOptions/pronounsTypes";
import { Link } from "@/utils/libs/routerFacade";
import PasswordInput from "@/ui/PasswordInput";

function UserAutoRegister() {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterProps>();

  const {
    privacyPolicyLink,
    useTermsLink,
    modalStatus,
    post,
    onModalClose,
    navigate,
    showPassword,
    setShowPassword,
    setUserData,
    isSendingEmail,
  } = useAutoRegister();

  const onSubmit: SubmitHandler<RegisterProps> = (data) => {
    if (isValid) {
      setUserData({
        fullName: data.fullName,
        email: data.email,
      });
      post(data);
    }
  };

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
        {false ? (
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

                  <Controller
                    render={({ field }) => (
                      <RadioGroup colorScheme="green" {...field}>
                        <Stack direction="row">
                          <Radio value="1">Cis</Radio>
                          <Radio value="2">Trans</Radio>
                          <Radio value="3">Outro</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                    control={control}
                    name="gender"
                  />

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

                <Controller
                  render={({ field }) => (
                    <RadioGroup colorScheme="green" {...field}>
                      <Stack direction="row">
                        <Radio value="true">Sim</Radio>
                        <Radio value="false">Não</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                  control={control}
                  name="disabledPerson"
                />

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
                  <ChakraLink
                    as={Link}
                    to={useTermsLink}
                    isExternal
                    colorScheme="green"
                    textDecoration={"underline"}
                  >
                    Termos de uso
                  </ChakraLink>{" "}
                  e{" "}
                  <ChakraLink
                    as={Link}
                    to={privacyPolicyLink}
                    isExternal
                    colorScheme="green"
                    textDecoration={"underline"}
                  >
                    Políticas de Privacidade
                  </ChakraLink>
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
        hasBtnCancel={false}
        isLoading={isSendingEmail}
      />
    </>
  );
}

export default UserAutoRegister;
