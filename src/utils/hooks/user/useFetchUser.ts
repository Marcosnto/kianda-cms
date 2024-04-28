import useStore from "@/store";
import { BASE_URL } from "@/utils/helpers/envs";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

const useFetchUser = () => {
  const [cookies] = useCookies(["token"]);
  const { currentSelectedUser } = useStore();
  const currentSelectedID = currentSelectedUser?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["editUser"],
    queryFn: () =>
      fetch(BASE_URL + `/user/${currentSelectedID}` || "", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
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

  return { data, isLoading, error };
};

export default useFetchUser;
