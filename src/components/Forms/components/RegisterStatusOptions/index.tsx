import { RegisterProps } from "@/utils/types/forms";
import {
  Checkbox,
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
import RequiredInput from "../RequiredInput";
import registerTypes from "@/helpers/mocks/inputOptions/register-types";

type RegisterStatusOptionsTypes = {
  errors: FieldErrors<RegisterProps>;
  register?: UseFormRegister<Partial<RegisterProps>>;
  currentValues?: Partial<RegisterProps>;
  control?: Control<Partial<RegisterProps> & { isToSendEmail?: boolean }>;
  hasLabel?: boolean;
  isRequired?: boolean;
  isToSendEmail: boolean;
  disabledRoleChange?: boolean;
  canChangeRole?: boolean;
};

export default function RegisterStatusOptions({
  errors,
  control,
  register,
  currentValues,
  isToSendEmail,
  hasLabel = false,
  isRequired = false,
  canChangeRole = false,
  disabledRoleChange = false,
}: RegisterStatusOptionsTypes) {
  return (
    <Stack spacing={5} direction="column">
      <FormControl isInvalid={isRequired ? !!errors.registerStatus : false}>
        {hasLabel ? (
          <FormLabel htmlFor="registerStatus">
            Status de Cadastro <RequiredInput />
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

      <FormControl>
        <Controller
          name="isToSendEmail"
          control={control}
          render={({ field }) => (
            <Checkbox
              defaultChecked={isToSendEmail}
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
              colorScheme="green"
            >
              Enviar email informando atualização do cadastro
            </Checkbox>
          )}
        />
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
