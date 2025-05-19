import useStore from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoggedUserType } from "@/components/Forms/User/EditRegister/EditRegisterForm.hook";
import { axiosInstance } from "@/api/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { BASE_API_URL } from "@/helpers/envs";
import { UpdateRegister } from "@/components/Forms/User/EditRegister/EditRegisterForm.types";
import { useEffect, useState } from "react";
import { UserProps } from "@/utils/types/user";
import setNumberOfPages from "@/utils/setNumberOfPages";
import { RegisterProps } from "@/utils/types/forms";

export const postUser = () => {
  const {
    mutate: postUserFn,
    isPending: isPostUserPending,
    isError: hasPostUserError,
    isSuccess: isPostUserSucess,
  } = useMutation({
    mutationFn: (data: RegisterProps) =>
      axiosInstance.post(`${BASE_API_URL}/user-register`, {
        fullName: data.fullName,
        bornDate: data.bornDate,
        email: data.email,
        password: data.password,
        pronouns: data.pronouns,
        gender: data.gender,
        otherGender: data.otherGender,
        disabledPerson: data.disabledPerson,
        disabledPersonDescription: data.disabledPersonDescription,
        acceptTerms: data.acceptTerm ? 1 : 0,
      }),
  });

  return { postUserFn, isPostUserSucess, isPostUserPending, hasPostUserError };
};

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

export function useGetUsers(currentPage: number, type: string | undefined) {
  const [totalPages, setTotalPages] = useState<number>(0);
  const userType = type === "all" ? "" : `&type=${type}`;

  const { data, isLoading, error, refetch } = useQuery<UserProps[]>({
    queryKey: ["userList", type],
    queryFn: () =>
      axiosInstance
        .get(`/users?_page=${currentPage}${userType}`)
        .then(({ data, headers }) => {
          const totalItens = headers["x-total-count"];
          setTotalPages(setNumberOfPages(totalItens) || 0);
          return data;
        })
        .catch(() => new Error("Ocorreu um erro ao obter os dados")),
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return { users: data, isLoading, error, totalPages };
}

export const updateUserRegister = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const toast = useToast();

  const {
    mutate: updateUserRegisterMutation,
    isPending: updateUserRegisterLoading,
    isError: hasUpdateUserRegisterError,
    isSuccess: isUpdateUserRegisterSucess,
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
        queryClient.invalidateQueries({ queryKey: ["userList"] });
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

  return {
    updateUserRegisterMutation,
    updateUserRegisterLoading,
    isUpdateUserRegisterSucess,
    hasUpdateUserRegisterError,
  };
};

export const updateUserStatus = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const toast = useToast();

  const { updateUserRegisterMutation, updateUserRegisterLoading } =
    updateUserRegister();

  const { mutate: updateUserStatusMutation, isPending: isUpdateUserPeding } =
    useMutation({
      mutationFn: ({ id, registerStatus }: UpdateRegister) =>
        fetch(BASE_API_URL + "/user/update-status" || "", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            registerStatus,
          }),
        }),
      onSuccess: (response) => {
        if (response.ok) {
          queryClient.invalidateQueries({ queryKey: ["userList"] });

          toast({
            title: `Atualização feita com sucesso!`,
            position: "top",
            status: "success",
            isClosable: true,
          });
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
    updateUserRegisterMutation,
    isUpdateUserPeding,
    // isSendingEmail,
    updateUserRegisterLoading,
  };
};
