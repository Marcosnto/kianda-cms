import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import useStore from "../../../../../store";
import { BASE_URL } from "../../../../../utils/helpers/envs";
import { apiError } from "../../../../../utils/helpers/messages";
import SpinnerLoad from "../../../../SpinnerLoad";
import { EditTerapheuticContract } from "./EditTerapheuticContract";

function EditRegister() {
  const { currentSelectedUser } = useStore();
  const currentSelectedID = currentSelectedUser?.id;

  const [cookies] = useCookies(["token"]);

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

  if (isLoading) {
    return <SpinnerLoad />;
  }

  if (error) {
    return <h1>{apiError}</h1>;
  }

  return <EditTerapheuticContract data={data} />;
}

export default EditRegister;
