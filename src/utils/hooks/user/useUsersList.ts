import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import setNumberOfPages from "../../setNumberOfPages";
import { BASE_URL } from "../../../helpers/envs";

export default function useUsersList(currentPage: number, token: string) {
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["usersList", currentPage],
    queryFn: () =>
      fetch(BASE_URL + `/users?_page=${currentPage}` || "", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          const totalItens = res.headers.get("X-Total-Count");
          setTotalPages(setNumberOfPages(totalItens) || 0);
          return res.json();
        } else {
          throw new Error("Ocorreu um erro ao obter os dados");
        }
      }),
  });

  return { users: data, isLoading, error, totalPages };
}
