import { useCookies } from "react-cookie";
import { LoginProps, ResponseProps } from "../../../pages/Login";
import { useState } from "react";
import { BASE_URL } from "../../helpers/envs";
import { useRouter } from "../../router/routerFacade";

export default function useLogin() {
  const navigate = useRouter();
  const [apiError, setApiError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "id",
    "role",
  ]);

  function login(data: LoginProps) {
    fetch(BASE_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: data.email, password: data.password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response: ResponseProps) => {
            if (response.registerStatus === "1") {
              const user = {
                id: response.id,
                role: response.role,
                name: response.user_display_name,
              };
              localStorage.setItem("user", JSON.stringify(user));
              setCookie("token", response.token, {
                path: "/",
                sameSite: "strict",
              });
              setTimeout(() => navigate("/dashboard"), 100);
            }
            setRegisterStatus(response.registerStatus);
          });
          setAuthError(false);
        } else {
          setAuthError(true);
        }
      })
      .catch(() => {
        setApiError(true);
      });
  }

  return {
    apiError,
    authError,
    isAuth,
    registerStatus,
    cookies,
    navigate,
    setApiError,
    login,
  };
}
