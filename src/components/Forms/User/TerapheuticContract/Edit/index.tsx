import { useQuery } from "@tanstack/react-query";

import { EditTerapheuticContract } from "./EditTerapheuticContract";
import useStore from "@/store";
import { BASE_URL } from "@/helpers/envs";
import SpinnerLoad from "@/components/SpinnerLoad";
import { apiError } from "@/helpers/messages";

function EditRegister() {
  const { currentSelectedUser } = useStore();
  const currentSelectedID = currentSelectedUser?.id;

  const token = localStorage.getItem("token");

  const { data, isLoading, error } = useQuery({
    queryKey: ["editUser"],
    queryFn: () =>
      fetch(BASE_URL + `/user/${currentSelectedID}` || "", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  return <EditTerapheuticContract data={data} />;
}

export default EditRegister;
