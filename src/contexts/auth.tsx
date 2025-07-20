import { handleValidateAuth } from "@/api/auth";
import { fetchProfile } from "@/api/user";
import useUserStore from "@/store/userStore";
import SpinnerLoad from "@/ui/SpinnerLoad";
import { useToast } from "@chakra-ui/react";
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
  const { setLoggedUser } = useUserStore();
  const toast = useToast();
  const {
    profileData,
    isFechSuccess,
    isFetchProfileLoading,
    fetchProfileError,
  } = fetchProfile();
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

  useEffect(() => {
    if (fetchProfileError) {
      toast({
        title: `Ocorreu um erro ao buscar o Perfil!`,
        position: "top",
        status: "error",
        isClosable: true,
      });

      signout();
    }
  }, [fetchProfileError]);

  useEffect(() => {
    if (isFechSuccess && profileData) {
      setLoggedUser(profileData);
    }
  }, [isFechSuccess]);

  return (
    <AuthContext.Provider
      value={{ isAuth: signedIn && isValidateAuthSuccess, signin, signout }}
    >
      {isValidateAuthLoading || isFetchProfileLoading ? (
        <SpinnerLoad size="xl" />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
