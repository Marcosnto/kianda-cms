import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import registerTypes from "../../../../utils/mocks/inputOptions/register-types";
import { RegisterProps } from "../../../../utils/types/forms";
import RequiredInput from "../RequiredInput";

type RegisterStatusOptionsTypes = {
  errors: FieldErrors<RegisterProps>;
  register?: UseFormRegister<RegisterProps>;
  currentValues?: Partial<RegisterProps>;
  control?: Control<Partial<RegisterProps>, any>;
  hasLabel?: boolean;
  isRequired?: boolean;
  disabledRoleChange?: boolean;
  canChangeRole?: boolean;
};

export default function RegisterStatusOptions({
  errors,
  control,
  register,
  currentValues,
  hasLabel = false,
  isRequired = false,
  canChangeRole = false,
  disabledRoleChange = false,
}: RegisterStatusOptionsTypes) {
  console.log({ currentValues });
  return (
    <Stack spacing={5} direction="column">
      <FormControl isInvalid={isRequired ? !!errors.registerStatus : false}>
        {hasLabel ? (
          <FormLabel htmlFor="registerStatus">
            Status do Cadastro <RequiredInput />
          </FormLabel>
        ) : null}
        <Controller
          render={({ field }) => (
            <RadioGroup colorScheme="green" {...field}>
              <Stack direction="row" gap="2">
                <Radio value="1">Ativo</Radio>
                <Radio value="0">Aguardando Aprovação</Radio>
                <Radio value="2">Supenso</Radio>
              </Stack>
            </RadioGroup>
          )}
          control={control}
          name="registerStatus"
        />

        <FormErrorMessage>
          {errors.registerStatus && errors.registerStatus.message}
        </FormErrorMessage>
      </FormControl>

      {canChangeRole && (
        <FormControl isInvalid={!!errors.role}>
          <FormLabel htmlFor="role">
            Tipo de registro <RequiredInput />
          </FormLabel>

          <Select
            placeholder="Escolha uma opção"
            defaultValue={currentValues?.role}
            colorScheme="green"
            disabled={disabledRoleChange}
            {...register?.("role", {
              required: "Esse campo é obrigatório",
            })}
          >
            {registerTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.role && errors.role.message}
          </FormErrorMessage>
        </FormControl>
      )}
    </Stack>
  );
}
