import ComponentTitle from "@/components/Title";
import { Article } from "@/utils/types/blog";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
            <FormControl isInvalid={!!errors.description} isRequired>
              <FormLabel htmlFor="description">Subtítulo</FormLabel>

              <Input
                id="description"
                type="text"
                {...register("description", {
                  required: "Esse Campo é obrigatório",
                  maxLength: {
                    value: 150,
                    message: "O limíte máximo de caracteres é de 150.",
                  },
                })}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            {/* <FormControl isInvalid={!!errors.slug}>
              <FormLabel htmlFor="slug">Slug</FormLabel>

              <Input
                id="slug"
                type="text"
                isDisabled
                {...register("slug")}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.slug && errors.slug.message}
              </FormErrorMessage>
            </FormControl> */}
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

            {/* <FormErrorMessage>
              {errors.image && errors.image.message}
            </FormErrorMessage> */}
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
