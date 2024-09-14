import useStore from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoggedUserType } from "@/components/Forms/User/EditRegister/EditRegisterForm.hook";
import { axiosInstance } from "@/api/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { BASE_API_URL } from "@/helpers/envs";
import { UpdateRegister } from "@/components/Forms/User/EditRegister/EditRegisterForm.types";
import { useState } from "react";
import { UserProps } from "@/utils/types/user";
import setNumberOfPages from "@/utils/setNumberOfPages";

export const fetchUsers = () => {
  const loggedUser: LoggedUserType = JSON.parse(
    localStorage.getItem("user") || "",
  );
  const { currentSelectedUser } = useStore();
  //TODO: Refactor this
  const currentSelectedID = currentSelectedUser?.id
    ? currentSelectedUser?.id
    : loggedUser.id;

  const {
    data: fetchData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["editUser"],
    queryFn: () => axiosInstance.get(`/user/${currentSelectedID}`),
  });

  return { fetchData, isLoading, error };
};

export default function useGetUsers(currentPage: number) {
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, isLoading, error } = useQuery<UserProps[]>({
    queryKey: ["usersList", currentPage],
    queryFn: () =>
      axiosInstance
        .get(`/users?_page=${currentPage}`)
        .then(({ data, headers }) => {
          const totalItens = headers["x-total-count"];
          setTotalPages(setNumberOfPages(totalItens) || 0);
          return data;
        })
        .catch(() => new Error("Ocorreu um erro ao obter os dados")),
  });

  return { users: data, isLoading, error, totalPages };
}

export const updateUserRegister = () => {
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

export const updateUserStatus = () => {
  const token = localStorage.getItem("token");
  const toast = useToast();
  // const { currentSelectedUser } = useStore();
  // const { sendEmailPost, isSendingEmail } = useSendEmailToUser({
  //   toastMessage: "Alteração realizada com sucesso",
  // });
  const { updateUserRegisterMutation, updateUserRegisterLoading } =
    updateUserRegister();

  // const sendEditRegisterEmail = useCallback(
  //   ({ fullName, email }: { fullName: string; email: string }) => {
  //     sendEmailPost({
  //       senderEmail: "teste@kiandadiversidade.com",
  //       senderName: "Kianda",
  //       recepients: [
  //         {
  //           email: email || currentSelectedUser?.email || "",
  //           name: fullName || currentSelectedUser?.fullName || "",
  //         },
  //       ],
  //       template: "",
  //       subject: "Cadastro alterado!",
  //       text: "Seu cadastro foi alterado. :)",
  //     });
  //   },
  //   [currentSelectedUser?.email, currentSelectedUser?.fullName, sendEmailPost],
  // );

  const { mutate: updateUserStatusMutation, isPending: isUpdateUserPeding } =
    useMutation({
      mutationFn: ({ id, fullName, email, registerStatus }: UpdateRegister) =>
        fetch(BASE_API_URL + "/user/update-status" || "", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            fullName,
            email,
            registerStatus,
          }),
        }),
      onSuccess: (response, variables) => {
        // const { fullName, email, sendEmail } = variables;
        if (response.ok) {
          // if (sendEmail) {
          //   sendEditRegisterEmail({
          //     fullName: fullName || "",
          //     email: email || "",
          //   });
          // }
          updateUserRegisterMutation({ ...variables });
        } else {
          toast({
            title: `Ocorreu um erro no servidor`,
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
      },
    });

  return {
    updateUserStatusMutation,
    isUpdateUserPeding,
    // isSendingEmail,
    updateUserRegisterLoading,
  };
};
