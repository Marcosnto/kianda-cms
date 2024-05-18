import { useContext, useState } from "react";

import { useRouter } from "@/utils/libs/routerFacade";
import { JWT_AUTH, JWT_VALIDATE } from "@/helpers/envs";
import { LoginProps, ResponseProps } from "./types";
import { AuthContext } from "@/contexts/auth";

export default function useLogin() {
  const navigate = useRouter();
  const [apiError, setApiError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("");
  const { signin } = useContext(AuthContext);

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
              signin(response.token);
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

  function validateToken() {
    fetch(JWT_VALIDATE || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        return response.ok;
      }
    });
  }

  return {
    apiError,
    authError,
    validateToken,
    registerStatus,
    navigate,
    setApiError,
    login,
  };
}
