import { axiosInstance } from "@/api/axiosInstance";
import setNumberOfPages from "@/utils/setNumberOfPages";
import { UserProps } from "@/utils/types/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUsersList(currentPage: number) {
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, isLoading, error } = useQuery<UserProps[]>({
    queryKey: ["usersList", currentPage],
    queryFn: () =>
      axiosInstance
        .get(`/users?_page=${currentPage}`)
        .then(({ data, headers }) => {
          const totalItens = headers["X-Total-Count"];
          setTotalPages(setNumberOfPages(totalItens) || 0);
          return data;
        })
        .catch(() => new Error("Ocorreu um erro ao obter os dados")),
  });

  return { users: data, isLoading, error, totalPages };
}
