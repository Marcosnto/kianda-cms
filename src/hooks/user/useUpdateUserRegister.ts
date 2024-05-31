import { UpdateRegister } from "@/components/Forms/User/EditRegister/EditRegisterForm.types";
import { BASE_API_URL } from "@/helpers/envs";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserRegister = () => {
  const token = localStorage.getItem("token");
  const toast = useToast();

  const {
    mutate: updateUserRegisterMutation,
    isPending: updateUserRegisterLoading,
  } = useMutation({
    mutationFn: ({ id, ...props }: UpdateRegister) =>
      fetch(BASE_API_URL + `/user/update/${id}` || "", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          ...props,
        }),
      }),
    onSuccess: (response) => {
      if (response.ok) {
        toast({
          title: `Alteração realizada com sucesso`,
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
    },
  });

  return { updateUserRegisterMutation, updateUserRegisterLoading };
};

export default useUpdateUserRegister;
