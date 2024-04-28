import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

import { FormReactHooksProps } from "../../../../utils/types/forms";
import RequiredInput from "../../components/RequiredInput";

export default function FirstEmergencyContact({
  errors,
  register,
}: FormReactHooksProps) {
  return (
    <>
      <Heading as="h2" size="md">
        Contato de Emergência 1
      </Heading>
      <Divider />

      <FormControl isInvalid={!!errors.firstEmergencyContact?.fullName}>
        <FormLabel id="firstEmergencyContactFullName">
          Nome Completo <RequiredInput />
        </FormLabel>
        <Input
          id="firstEmergencyContactFullName"
          type="text"
          {...register("firstEmergencyContact.fullName", {
            required: "Esse Campo é obrigatório",
          })}
          focusBorderColor="green.800"
        />
        <FormErrorMessage>
          {errors.firstEmergencyContact?.fullName &&
            errors.firstEmergencyContact?.fullName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.firstEmergencyContact?.address}>
        <FormLabel htmlFor="firstEmergencyContactAddress">
          Endereço <RequiredInput />
        </FormLabel>
        <Input
          id="firstEmergencyContactAddress"
          type="text"
          {...register("firstEmergencyContact.address", {
            required: "Esse Campo é obrigatório",
          })}
          focusBorderColor="green.800"
        />
        <FormErrorMessage>
          {errors.firstEmergencyContact?.address &&
            errors.firstEmergencyContact?.address.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.firstEmergencyContact?.contact}>
        <FormLabel htmlFor="firstEmergencyContactContact">
          Telefone de contato <RequiredInput />
        </FormLabel>
        <NumberInput>
          <NumberInputField
            id="firstEmergencyContactContact"
            {...register("firstEmergencyContact.contact", {
              required: "Esse Campo é obrigatório",
            })}
          />
        </NumberInput>
        <FormErrorMessage>
          {errors.firstEmergencyContact?.contact &&
            errors.firstEmergencyContact?.contact.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.firstEmergencyContact?.email}>
        <FormLabel htmlFor="firstEmergencyContactEmail">
          E-mail <RequiredInput />
        </FormLabel>
        <Input
          id="firstEmergencyContactEmail"
          type="email"
          {...register("firstEmergencyContact.email", {
            required: "Esse Campo é obrigatório",
          })}
          focusBorderColor="green.800"
        />
        <FormErrorMessage>
          {errors.firstEmergencyContact?.email &&
            errors.firstEmergencyContact?.email.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
