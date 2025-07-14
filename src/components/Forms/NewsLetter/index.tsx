import ComponentTitle from "@/ui/Title";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import RichTextInput from "../components/RichTextInput";
import { useSendEmailNewsLetter } from "./send-email-newsletter.hook";
import SpinnerLoad from "@/ui/SpinnerLoad";
import { apiError } from "@/helpers/messages";

export default function NewsLetter() {
  const {
    register,
    handleSubmit,
    onSubmit,
    reset,
    control,
    errors,
    isDirty,
    isNewsLetterListLoading,
    getNewsLetterListErrors,
    isSendingEmail,
  } = useSendEmailNewsLetter();

  if (isNewsLetterListLoading) {
    return <SpinnerLoad />;
  }

  if (getNewsLetterListErrors) {
    return <h1>{apiError}</h1>;
  }

  return (
    <div>
      <ComponentTitle title="Newsletter - Novo Email" type="h1" size="lg" />
      <Center mb={5}>
        Esta página é um formulário para enviar emails de newsletter. Você pode
        personalizar o conteúdo do email e enviá-lo para os assinantes da
        newsletter.
      </Center>

      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Box display="flex" flexDirection="column" gap="8">
          <FormControl isInvalid={!!errors.title} isRequired>
            <FormLabel htmlFor="title">Título</FormLabel>

            <Input
              id="title"
              type="text"
              {...register("title", {
                required: "Esse Campo é obrigatório",
              })}
              focusBorderColor="green.800"
            />

            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.emailContent} isRequired>
            <FormLabel htmlFor="emailContent">Email</FormLabel>

            <Controller
              control={control}
              name="emailContent"
              render={({ field: { onChange, onBlur, value } }) => (
                <RichTextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />

            <FormErrorMessage>
              {errors.emailContent && errors.emailContent.message}
            </FormErrorMessage>
          </FormControl>

          <Stack
            direction="row"
            spacing={4}
            align="center"
            justifyContent="space-around"
            mt="6"
            mb="8"
          >
            <Button
              colorScheme="green"
              variant="outline"
              onClick={() => reset()}
            >
              Limpar
            </Button>
            <Button
              colorScheme="green"
              variant="solid"
              type="submit"
              isDisabled={!isDirty}
              isLoading={isSendingEmail}
              loadingText="Enviando..."
            >
              Salvar
            </Button>
          </Stack>
        </Box>
      </form>
    </div>
  );
}
