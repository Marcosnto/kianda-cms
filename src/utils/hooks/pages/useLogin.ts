import { useState } from "react";

import { LoginProps, ResponseProps } from "@/pages/Login";
import { useRouter } from "@/utils/libs/routerFacade";
import { JWT_AUTH } from "@/helpers/envs";

export default function useLogin() {
  const navigate = useRouter();
  const [apiError, setApiError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("");

  function login(data: LoginProps) {
    fetch(JWT_AUTH || "", {
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
              localStorage.setItem("token", response.token);
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

  function validateToken(token: string) {
    fetch(JWT_AUTH || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
              localStorage.setItem("token", response.token);
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
    navigate,
    setApiError,
    login,
  };
}
