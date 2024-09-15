import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { BASE_API_URL } from "@/helpers/envs";
import { TherapeuticContractProps } from "@/utils/types/forms";

export const getTherapeuticContract = (contractID: string | undefined) => {
  const {
    data: contractData,
    isLoading: isContractDataLoading,
    isError: isContractDataError,
  } = useQuery<TherapeuticContractProps>({
    queryKey: ["editTerapheuticContract"],
    queryFn: () => axiosInstance.get(`${BASE_API_URL}/contract/${contractID}`),
  });

  return { contractData, isContractDataError, isContractDataLoading };
};

export const handlepostTherapeuticContractFn = (
  contractID: string | undefined,
) => {
  const {
    mutate: postTherapeuticContractFn,
    isError: ispostTherapeuticContractFnError,
    isPending: ispostTherapeuticContractFnPending,
    isSuccess: ispostTherapeuticContractFnSuccess,
  } = useMutation({
    mutationFn: (data: TherapeuticContractProps) =>
      axiosInstance.post<TherapeuticContractProps>(
        `${BASE_API_URL}/terapheutic-contract`,
        JSON.stringify({
          id: contractID,
          fullName: data.fullName,
          bornDate: data.bornDate,
          rg: data.rg,
          cpf: data.cpf,
          email: data.email,
          contactNumber: data.contactNumber,
          address: data.address,
          schooling: data.schooling,
          profession: data.profession,
          ethnicity: data.ethnicity,
          sexualOrientation: data.sexualOrientation,
          pronouns: data.pronouns,
          gender: data.gender,
          otherGender: data.otherGender,
          civilStatus: data.civilStatus,
          childrens: data.childrens,
          childrenQuantity: data.childrenQuantity,
          religion: data.religion,
          disabledPerson: data.disabledPerson,
          disabledPersonDescription: data.disabledPersonDescription,
          needSuitability: data.needSuitability,
          spouse: data.spouse,
          firstEmergencyContact: data.firstEmergencyContact,
          secondEmergencyContact: data.secondEmergencyContact,
          terapheuticContractComplete: 1,
        }),
      ),
  });

  return {
    postTherapeuticContractFn,
    ispostTherapeuticContractFnError,
    ispostTherapeuticContractFnPending,
    ispostTherapeuticContractFnSuccess,
  };
};
