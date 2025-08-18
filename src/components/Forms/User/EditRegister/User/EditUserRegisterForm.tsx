import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";

import { EditRegisterFormTypes } from "../types/EditRegisterForm.types";
import ComponentTitle from "@/ui/Title";
import RequiredInput from "../../../components/RequiredInput";
import { useRouter } from "@/utils/libs/routerFacade";
import pronounsTypes from "@/helpers/mocks/inputOptions/pronounsTypes";
import { Controller } from "react-hook-form";
import defaultImage from "/assets/images/default_profile.jpg";

export function EditUserRegisterForm({
  avatar,
  errors,
  isSubmitting,
  register,
  onSubmit,
  handleSubmit,
  getValues,
  control,
  watch,
  setIsOpenDeleteModal,
}: EditRegisterFormTypes) {
  const navigate = useRouter();
  const watched = watch!(["gender"]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ComponentTitle title={"Dados cadastrais"} type="h1" />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="10"
          flexDir="column"
          gap="5"
        >
          <Image
            borderRadius="full"
            borderStyle="solid"
            borderWidth="1px"
            borderColor="gray.300"
            boxShadow="sm"
            boxSize="150px"
            objectFit="cover"
            src={avatar ? avatar : defaultImage}
            alt="DM"
          />
        </Box>
        <Flex flexDir="column" gap="5" mb="10">
          <FormControl>
            <FormLabel htmlFor="avatar">Foto de perfil</FormLabel>
            <Input
              id="avatar"
              type="file"
              {...register("avatar")}
              focusBorderColor="green.800"
            />
          </FormControl>
          <Stack spacing={8} direction="row">
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
            </FormControl>

            <FormErrorMessage>
              {errors.fullName && errors.fullName.message}
            </FormErrorMessage>

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
          </Stack>

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
                      getValues!("emailCheck") === value ||
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
                      getValues!("email") === value ||
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
        </Flex>

        <Flex flexDir="row" gap="5" justifyContent="space-around">
          <Button
            colorScheme="green"
            variant="outline"
            onClick={() => navigate("../", { relative: "path" })}
          >
            Voltar
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Editando"
          >
            Editar
          </Button>
        </Flex>
      </form>
      <Box w="100%" mt="10">
        <Button
          w="100%"
          colorScheme="red"
          variant="outline"
          onClick={() => setIsOpenDeleteModal?.(true)}
        >
          Apagar conta
        </Button>
      </Box>
    </>
  );
}
