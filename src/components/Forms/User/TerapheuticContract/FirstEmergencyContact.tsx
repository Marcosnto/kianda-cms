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

      <FormControl isInvalid={!!errors.firstEmergencyContact?.contactNumber}>
        <FormLabel htmlFor="firstEmergencyContactContactNumber">
          Telefone de contato <RequiredInput />
        </FormLabel>
        <Input
          id="firstEmergencyContactContactNumber"
          type="number"
          {...register("firstEmergencyContact.contactNumber", {
            required: "Esse Campo é obrigatório",
          })}
        />

        <FormErrorMessage>
          {errors.firstEmergencyContact?.contactNumber &&
            errors.firstEmergencyContact?.contactNumber.message}
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
