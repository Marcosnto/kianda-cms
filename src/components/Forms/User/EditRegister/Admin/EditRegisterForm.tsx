import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

import { EditRegisterFormTypes } from "../EditRegisterForm.types";
import ComponentTitle from "@/ui/Title";
import RegisterStatusOptions from "../../../components/RegisterStatusOptions";
import RequiredInput from "../../../components/RequiredInput";
import { useRouter } from "@/utils/libs/routerFacade";

export function EditRegisterForm({
  userName,
  control,
  errors,
  isSubmitting,
  currentValues,
  isToSendEmail,
  disabledRoleChange,
  canChangeRole,
  register,
  onSubmit,
  handleSubmit,
}: EditRegisterFormTypes) {
  const navigate = useRouter();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ComponentTitle title={`Dados cadastrais - ${userName}`} type="h1" />
        <Flex flexDir="column" gap="5" mb="10">
          <RegisterStatusOptions
            errors={errors}
            control={control}
            register={register}
            currentValues={currentValues}
            hasLabel
            isRequired
            canChangeRole={canChangeRole}
            disabledRoleChange={disabledRoleChange}
            isToSendEmail={isToSendEmail}
          />

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

              <FormErrorMessage>
                {errors.fullName && errors.fullName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">
                Email <RequiredInput />
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
          </Stack>
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
    </>
  );
}
