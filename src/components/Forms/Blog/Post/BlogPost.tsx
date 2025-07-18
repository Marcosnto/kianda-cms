import ComponentTitle from "@/ui/Title";
import { Article } from "@/utils/types/blog";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RichTextInput from "../../components/RichTextInput";
import { useNavigate } from "react-router-dom";

export default function BlogPost({
  post,
  resetForm,
  setResetForm,
}: {
  post: any;
  resetForm: boolean;
  setResetForm: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Article>();

  const onSubmit: SubmitHandler<Article> = (data) => post(data);

  useEffect(() => {
    if (resetForm) {
      reset();
      setResetForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm]);

  return (
    <>
      <ComponentTitle title="Novo Artigo" type="h1" size="lg" />
      <form typeof="form" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap="8">
          <Stack spacing={8} direction="row">
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

            <FormControl isInvalid={!!errors.author} isRequired>
              <FormLabel htmlFor="author">Author</FormLabel>

              <Input
                id="author"
                type="text"
                {...register("author", {
                  required: "Esse Campo é obrigatório",
                })}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.author && errors.author.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <Stack spacing={8} direction="row">
            <FormControl isInvalid={!!errors.subtitle}>
              <FormLabel htmlFor="subtitle">Subtítulo</FormLabel>

              <Input
                id="subtitle"
                type="text"
                {...register("subtitle")}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.subtitle && errors.subtitle.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.author} isRequired>
              <FormLabel htmlFor="columnType">Coluna</FormLabel>

              <Select
                id="columnType"
                {...register("columnType", {
                  required: "Esse Campo é obrigatório",
                })}
                focusBorderColor="green.800"
                placeholder="Selecione uma coluna"
                colorScheme="green"
              >
                <option value="option1">Saúde</option>
                <option value="option2">Educação</option>
                <option value="option3">Cultura e Sociedade</option>
                <option value="option4">Diversidade e Inclusão</option>
              </Select>

              <FormErrorMessage>
                {errors.columnType && errors.columnType.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isInvalid={!!errors.image}>
            <FormLabel htmlFor="image">Imagem</FormLabel>

            <Input
              id="image"
              type="file"
              {...register("image")}
              variant="flushed"
              focusBorderColor="green.800"
            />

            <FormErrorMessage>
              {errors.image && errors.image.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.imageDescription} isRequired>
            <FormLabel htmlFor="imageDescription">
              Descrição da Imagem
            </FormLabel>

            <Input
              id="imageDescription"
              type="text"
              {...register("imageDescription")}
              focusBorderColor="green.800"
            />
            <Text fontSize="xs">
              Essa descrição é utilizada para leitores de telas (pessoas com
              baixa/nenhuma visão)
            </Text>
            <FormErrorMessage>
              {errors.imageDescription && errors.imageDescription.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.imageSub} isRequired>
            <FormLabel htmlFor="imageSub">Legenda da Imagem</FormLabel>

            <Input
              id="imageSub"
              type="text"
              {...register("imageSub")}
              focusBorderColor="green.800"
            />
            <Text fontSize="xs">Será exibida abaixo da imagem</Text>

            <FormErrorMessage>
              {errors.imageSub && errors.imageSub.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content} isRequired>
            <FormLabel htmlFor="content">Conteúdo</FormLabel>

            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value } }) => (
                <RichTextInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  resetImages={resetForm}
                />
              )}
            />

            <FormErrorMessage>
              {errors.content && errors.content.message}
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
              onClick={() => navigate("../articles", { relative: "path" })}
            >
              Voltar
            </Button>
            <Button colorScheme="green" variant="solid" type="submit">
              Salvar
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
}
