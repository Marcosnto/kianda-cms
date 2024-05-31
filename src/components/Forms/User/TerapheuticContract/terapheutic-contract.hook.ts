import { useQuery } from "@tanstack/react-query";

import { BASE_API_URL } from "@/helpers/envs";

import { useParams } from "@/utils/libs/routerFacade";
import { TherapeuticContractProps } from "@/utils/types/forms";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";

export default function useTerapheuticContractForm() {
  const toast = useToast();
  const token = localStorage.getItem("token");
  const { contractID } = useParams();

  const {
    data: patientData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["editTerapheuticContract"],
    queryFn: () =>
      fetch(BASE_API_URL + `/contract/${contractID}` || "", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Ocorreu um erro ao obter os dados");
        }
      }),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors: formErros },
  } = useForm<TherapeuticContractProps>({
    mode: "onChange",
    defaultValues: patientData,
  });

  const watched = watch(["civilStatus"]);

  let hasErros = Object.keys(formErros).length > 0;

  function post(newData: TherapeuticContractProps) {
    fetch(BASE_API_URL + "/terapheutic-contract" || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: contractID,
        fullName: newData.fullName,
        bornDate: newData.bornDate,
        rg: newData.rg,
        cpf: newData.cpf,
        email: newData.email,
        contactNumber: newData.contactNumber,
        address: newData.address,
        schooling: newData.schooling,
        profession: newData.profession,
        ethnicity: newData.ethnicity,
        sexualOrientation: newData.sexualOrientation,
        pronouns: newData.pronouns,
        gender: newData.gender,
        otherGender: newData.otherGender,
        civilStatus: newData.civilStatus,
        childrens: newData.childrens,
        childrenQuantity: newData.childrenQuantity,
        religion: newData.religion,
        disabledPerson: newData.disabledPerson,
        disabledPersonDescription: newData.disabledPersonDescription,
        needSuitability: newData.needSuitability,
        spouse: newData.spouse,
        firstEmergencyContact: newData.firstEmergencyContact,
        secondEmergencyContact: newData.secondEmergencyContact,
        terapheuticContractComplete: 1,
      }),
    }).then((response) => {
      if (response.ok) {
        toast({
          title: `Dados atualizados com sucesso!`,
          position: "top",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: `Ocorreu um erro ao atualizar os dados`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    });
  }

  const onSubmit: SubmitHandler<TherapeuticContractProps> = (newData) => {
    if (!hasErros) {
      post(newData);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    onSubmit,
    reset,
    formErros,
    hasErros,
    isLoading,
    patientData,
    error,
    watched,
    control,
  };
}
