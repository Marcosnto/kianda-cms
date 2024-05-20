import { Box, Button, Divider, Heading, Stack } from "@chakra-ui/react";

import FirstEmergencyContact from "./FirstEmergencyContact";
import GeneralInformations from "./GeneralInformations";
import Partner from "./Partner";
import SecondEmergencyContact from "./SecondEmergencyContact";

import useTerapheuticContractForm from "./terapheutic-contract.hook";
import SpinnerLoad from "@/components/SpinnerLoad";
import { apiError } from "@/helpers/messages";
import { useEffect } from "react";

export default function TerapheuticContract() {
  const {
    register,
    handleSubmit,
    watch,
    onSubmit,
    reset,
    formErros,
    isLoading,
    hasErros,
    error,
    patientData,
    watched,
    control,
  } = useTerapheuticContractForm();

  useEffect(() => {
    if (patientData) {
      reset(patientData);
    }
  }, [patientData, reset]);

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  return (
    <>
      <Heading textAlign="center" mb="10" as="h1" size="xl">
        Contrato Terapêutico
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDir="column" gap="7">
          <Divider />
          <GeneralInformations
            errors={formErros}
            register={register}
            watch={watch}
            control={control}
          />

          {Number(watched[0]) === 2 ? (
            <>
              <Divider />
              <Partner errors={formErros} register={register} watch={watch} />
            </>
          ) : null}
          <Divider />

          <FirstEmergencyContact
            errors={formErros}
            register={register}
            watch={watch}
          />
          <Divider />

          <SecondEmergencyContact
            errors={formErros}
            register={register}
            watch={watch}
          />
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
            <Button
              colorScheme="green"
              variant="solid"
              type="submit"
              isDisabled={hasErros}
            >
              Salvar
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
}
