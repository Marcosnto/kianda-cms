import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import setNumberOfPages from "../../../utils/setNumberOfPages";
import { BASE_URL } from "../../../utils/helpers/envs";

export default function useBlogList(currentPage: number) {
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogList", currentPage],
    queryFn: () =>
      fetch(BASE_URL + `/articles?_page=${currentPage}` || "", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        const totalItens = res.headers.get("X-Total-Count");
        setTotalPages(setNumberOfPages(totalItens) || 0);
        return res.json();
      }),
  });

  return { blogPosts: data, isLoading, error, totalPages };
}
