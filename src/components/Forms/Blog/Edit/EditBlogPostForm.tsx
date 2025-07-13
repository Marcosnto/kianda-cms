import ComponentTitle from "@/ui/Title";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import RequiredInput from "../../components/RequiredInput";
import RichTextInput from "../../components/RichTextInput";
import { useNavigate } from "react-router-dom";

export function EditBlogPostForm({
  data,
  register,
  handleSubmit,
  errors,
  control,
  onSubmit,
}: any) {
  const navigate = useNavigate();
  return (
    <>
      <ComponentTitle title={`Artigo - ${data.title}`} type="h1" size="lg" />

      <form typeof="form" onSubmit={handleSubmit(onSubmit)}>
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
                <option value="option1">Coluna 1</option>
                <option value="option2">Coluna 2</option>
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
              onClick={() => navigate("../../articles", { relative: "path" })}
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
