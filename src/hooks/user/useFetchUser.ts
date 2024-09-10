import useStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { LoggedUserType } from "@/components/Forms/User/EditRegister/EditRegisterForm.hook";
import { axiosInstance } from "@/api/axiosInstance";

const useFetchUser = () => {
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

export default useFetchUser;
