import useUserStore from "@/store/userStore";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAvatarMenu() {
  const [currentUser, setCurrentUser] = useState({ user_display_name: "" });
  const navigate = useNavigate();
  const { removeLoggedUser } = useUserStore();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    removeLoggedUser();
  }, []);

  return {
    currentUser,
    setCurrentUser,
    logout,
    navigate,
  };
}
