import { FormReactHooksProps } from "@/utils/types/forms";
import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import RequiredInput from "../../components/RequiredInput";

export default function SecondEmergencyContact({
  errors,
  register,
}: FormReactHooksProps) {
  return (
    <>
      <Heading as="h2" size="md">
        Contato de Emergência 2
      </Heading>
      <Divider />

      <FormControl isInvalid={!!errors.secondEmergencyContact?.fullName}>
        <FormLabel id="secondEmergencyContactFullName">
          Nome Completo <RequiredInput />
        </FormLabel>
        <Input
          id="secondEmergencyContactFullName"
          type="text"
          {...register("secondEmergencyContact.fullName", {
            required: "Esse Campo é obrigatório",
          })}
        />
        <FormErrorMessage>
          {errors.secondEmergencyContact?.fullName &&
            errors.secondEmergencyContact?.fullName.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.secondEmergencyContact?.address}>
        <FormLabel htmlFor="secondEmergencyContactAddress">
          Endereço <RequiredInput />
        </FormLabel>
        <Input
          id="secondEmergencyContactAddress"
          type="text"
          {...register("secondEmergencyContact.address", {
            required: "Esse Campo é obrigatório",
          })}
        />
        <FormErrorMessage>
          {errors.secondEmergencyContact?.address &&
            errors.secondEmergencyContact?.address.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.secondEmergencyContact?.contact}>
        <FormLabel htmlFor="secondEmergencyContactContact">
          Telefone de contato <RequiredInput />
        </FormLabel>
        <Input
          id="secondEmergencyContactContact"
          type="number"
          {...register("secondEmergencyContact.contact", {
            required: "Esse Campo é obrigatório",
          })}
        />
        <FormErrorMessage>
          {errors.secondEmergencyContact?.contact &&
            errors.secondEmergencyContact?.contact.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.secondEmergencyContact?.email}>
        <FormLabel htmlFor="secondEmergencyContactEmail">
          E-mail <RequiredInput />
        </FormLabel>
        <Input
          id="secondEmergencyContactEmail"
          type="email"
          {...register("secondEmergencyContact.email", {
            required: "Esse Campo é obrigatório",
          })}
        />
        <FormErrorMessage>
          {errors.secondEmergencyContact?.email &&
            errors.secondEmergencyContact?.email.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
