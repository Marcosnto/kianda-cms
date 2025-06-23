import {
  FormControl,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Article } from "@/utils/types/blog";

type ArticleStatusOptionsTypes = {
  errors: FieldErrors<Article>;
  register?: UseFormRegister<Partial<Article>>;
  control?: any;
  isRequired?: boolean;
};

export default function ArticleStatusOptions({
  errors,
  control,
  isRequired = false,
}: ArticleStatusOptionsTypes) {
  return (
    <Stack spacing={5} direction="column">
      <FormControl isInvalid={isRequired ? !!errors.status : false}>
        <Controller
          render={({ field }) => (
            <RadioGroup colorScheme="green" {...field}>
              <Stack direction="row" gap="2">
                <Radio value="publish">Publicado</Radio>
                <Radio value="draft">Rascunho</Radio>
                <Radio value="trash">Deletado</Radio>
              </Stack>
            </RadioGroup>
          )}
          control={control}
          name="status"
        />

        <FormErrorMessage>
          {errors.status && errors.status.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
}
