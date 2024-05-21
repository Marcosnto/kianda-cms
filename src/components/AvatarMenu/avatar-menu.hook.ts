import { useRouter } from "@/utils/libs/routerFacade";
import { useCallback, useState } from "react";

export default function useAvatarMenu() {
  const [currentUser, setCurrentUser] = useState({ user_display_name: "" });
  const navigate = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return {
    currentUser,
    setCurrentUser,
    logout,
    navigate,
  };
}
