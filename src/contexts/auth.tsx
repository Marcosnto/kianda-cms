import { handleValidateAuth } from "@/api/auth";
import SpinnerLoad from "@/components/SpinnerLoad";
import { Spinner, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";

type AuthContextTypes = {
  isAuth?: boolean;
  signin?: (accessToken: string) => void;
  signout?: () => void;
};

const AuthContext = createContext<AuthContextTypes>({});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem("token");

    return !!storageAccessToken;
  });

  const { isValidateAuthLoading, isValidateAuthError, isValidateAuthSuccess } =
    handleValidateAuth(signedIn);

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
    if (isValidateAuthError) {
      toast({
        title: `Sua sessão expirou!`,
        position: "top",
        status: "error",
        isClosable: true,
      });

      signout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidateAuthError]);

  return (
    <AuthContext.Provider
      value={{ isAuth: signedIn && isValidateAuthSuccess, signin, signout }}
    >
      {isValidateAuthLoading ? <SpinnerLoad size="xl" /> : children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
