import { JWT_VALIDATE } from "@/helpers/envs";
import { Spinner, useToast } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";

type AuthContextTypes = {
  isAuth?: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextTypes>({});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem("token");

    return !!storageAccessToken;
  });

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["auth"],
    queryFn: () =>
      fetch(JWT_VALIDATE || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Invalid token");
        }

        return response.json();
      }),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem("token", accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({
      queryKey: ["auth"],
    });

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      toast({
        title: `Sua sessão expirou!`,
        position: "top",
        status: "error",
        isClosable: true,
      });

      signout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  //TODO: LOGIN LOADING PAGE
  return (
    <AuthContext.Provider
      value={{ isAuth: signedIn && isSuccess, signin, signout }}
    >
      {isLoading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
