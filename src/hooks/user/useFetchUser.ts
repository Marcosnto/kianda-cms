import useStore from "@/store";
import { BASE_URL } from "@/helpers/envs";
import { useQuery } from "@tanstack/react-query";
import { LoggedUserType } from "@/components/Forms/User/EditRegister/EditRegisterForm.hook";

const useFetchUser = () => {
  const token = localStorage.getItem("token");
  const loggedUser: LoggedUserType = JSON.parse(
    localStorage.getItem("user") || "",
  );
  const { currentSelectedUser } = useStore();
  //TODO: Refactor this
  const currentSelectedID = currentSelectedUser?.id
    ? currentSelectedUser?.id
    : loggedUser.id;

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

  return { data, isLoading, error };
};

export default useFetchUser;
