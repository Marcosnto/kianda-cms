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
  Textarea,
} from "@chakra-ui/react";
import { useLayoutEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import RequiredInput from "../../components/RequiredInput";

export function EditBlogPostForm({
  data,
  register,
  handleSubmit,
  reset,
  errors,
}: any) {
  useLayoutEffect(() => {
    reset({
      title: data.title,
      author: data.author,
      content: data.content,
      description: data.description,
      image: data.image,
      imageDescription: data.imageDescription,
      imageSub: data.imageSub,
      status: data.status,
    });
  }, [data, reset]);

  const onSubmit: SubmitHandler<Article> = () => {
    // post(data);
  };

  return (
    <>
      <form typeof="form" onSubmit={handleSubmit(onSubmit)}>
        <ComponentTitle title={`Artigo - ${data.title}`} type="h1" size="lg" />

        <Box display="flex" flexDirection="column" gap="8">
          <Stack spacing={8} direction="row">
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">
                Título <RequiredInput />
              </FormLabel>

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

            <FormControl isInvalid={!!errors.author}>
              <FormLabel htmlFor="author">
                Author <RequiredInput />
              </FormLabel>

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
            <FormControl isInvalid={!!errors.description}>
              <FormLabel htmlFor="description">
                Resumo <RequiredInput />
              </FormLabel>

              <Input
                id="description"
                type="text"
                {...register("description", {
                  required: "Esse Campo é obrigatório",
                })}
                focusBorderColor="green.800"
              />

              <FormErrorMessage>
                {errors.description && errors.description.message}
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

            {/* <FormErrorMessage>
              {errors.image && errors.image.message}
            </FormErrorMessage> */}
          </FormControl>

          <FormControl isInvalid={!!errors.imageDescription}>
            <FormLabel htmlFor="imageDescription">
              Descrição da Imagem <RequiredInput />
            </FormLabel>

            <Input
              id="imageDescription"
              type="text"
              {...register("imageDescription")}
              focusBorderColor="green.800"
            />

            <FormErrorMessage>
              {errors.imageDescription && errors.imageDescription.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.imageSub}>
            <FormLabel htmlFor="imageSub">
              Legenda da Imagem <RequiredInput />
            </FormLabel>

            <Input
              id="imageSub"
              type="text"
              {...register("imageSub")}
              focusBorderColor="green.800"
            />

            <FormErrorMessage>
              {errors.imageSub && errors.imageSub.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel htmlFor="content">
              Conteúdo <RequiredInput />
            </FormLabel>

            <Textarea
              id="content"
              size="lg"
              {...register("content", {
                required: "Esse Campo é obrigatório",
              })}
              focusBorderColor="green.800"
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
            <Button colorScheme="green" variant="outline" type="reset">
              Cancelar
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
