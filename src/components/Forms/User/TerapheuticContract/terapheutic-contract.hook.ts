import { useParams } from "@/utils/libs/routerFacade";
import { TherapeuticContractProps } from "@/utils/types/forms";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  getTherapeuticContract,
  handlepostTherapeuticContractFn,
} from "@/api/contract";

export default function useTerapheuticContractForm() {
  const { contractID } = useParams();

  const { contractData, isContractDataError, isContractDataLoading } =
    getTherapeuticContract(contractID);

  const {
    postTherapeuticContractFn,
    ispostTherapeuticContractFnError,
    ispostTherapeuticContractFnPending,
    ispostTherapeuticContractFnSuccess,
  } = handlepostTherapeuticContractFn(contractID);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors: formErros },
  } = useForm<TherapeuticContractProps>({
    mode: "onChange",
    defaultValues: contractData,
  });

  const watched = watch(["civilStatus"]);

  let hasErros = Object.keys(formErros).length > 0;

  const onSubmit: SubmitHandler<TherapeuticContractProps> = (newData) => {
    if (!hasErros) {
      postTherapeuticContractFn(newData);
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
    isContractDataLoading,
    contractData,
    isContractDataError,
    watched,
    control,
    ispostTherapeuticContractFnError,
    ispostTherapeuticContractFnPending,
    ispostTherapeuticContractFnSuccess,
  };
}
