import useStore from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axiosInstance";
import { useToast } from "@chakra-ui/react";
import { BASE_API_URL } from "@/helpers/envs";
import { useEffect, useState } from "react";
import { UserProps } from "@/utils/types/user";
import setNumberOfPages from "@/utils/setNumberOfPages";
import { RegisterProps } from "@/utils/types/forms";
import {
  LoggedUserType,
  UpdateRegister,
} from "@/components/Forms/User/EditRegister/types/EditRegisterForm.types";

export const postUserAutoRegister = () => {
  const {
    mutate: postUserAutoRegisterFn,
    isPending: isPostUserAutoRegisterPending,
    isError: hasPostUserAutoRegisterError,
    isSuccess: isPostUserAutoRegisterSucess,
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

  return {
    postUserAutoRegisterFn,
    isPostUserAutoRegisterSucess,
    isPostUserAutoRegisterPending,
    hasPostUserAutoRegisterError,
  };
};

export const postUserRegister = () => {
  const toast = useToast();

  const {
    mutate: postUserRegisterFn,
    isPending: isPostUserRegisterPending,
    isError: hasPostUserRegisterError,
    isSuccess: isPostUserRegisterSucess,
  } = useMutation({
    mutationFn: (data: RegisterProps) =>
      axiosInstance.post(`${BASE_API_URL}/user`, {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
        acceptTerms: false,
      }),
    onSuccess: () => {
      toast({
        title: `Usuário cadastrado com sucesso`,
        position: "top",
        status: "success",
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: `Ocorreu um erro ao cadastrar o usuário`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    },
  });

  return {
    postUserRegisterFn,
    isPostUserRegisterSucess,
    isPostUserRegisterPending,
    hasPostUserRegisterError,
  };
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
        method: "POST",
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
  const toast = useToast();

  const {
    mutate: updateUserStatusMutation,
    isPending: isUpdateUserPeding,
    isSuccess: isUpdateUserSuccess,
  } = useMutation({
    mutationFn: ({ id, registerStatus }: UpdateRegister) =>
      axiosInstance.put(
        `/user/update-status/`,
        JSON.stringify({
          id,
          registerStatus,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      toast({
        title: `Atualização de usuário feita com sucesso!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: `Ocorreu um erro ao atualizar o status do usuário!`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    },
  });

  return {
    updateUserStatusMutation,
    isUpdateUserSuccess,
    isUpdateUserPeding,
  };
};
