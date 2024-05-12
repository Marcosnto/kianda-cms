import { useRouter } from "@/utils/libs/routerFacade";
import useLogin from "../Login/login.hook";
import { useQuery } from "@tanstack/react-query";
import { JWT_VALIDATE } from "@/helpers/envs";

export default function useDashboard() {
  const navigate = useRouter();
  const { validateToken } = useLogin();

  const hasToken = localStorage.getItem("token");

  const {
    data: isAuth,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: () =>
      fetch(JWT_VALIDATE || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        if (response.ok) {
          return response.status;
        }
      }),
  });

  return {
    navigate,
    hasToken,
    isAuth,
    isLoading,
    error,
  };
}
