import useUserStore from "@/store/userStore";
import logout from "@/utils/logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAvatarMenu() {
  const [currentUser, setCurrentUser] = useState({ user_display_name: "" });
  const { removeLoggedUser } = useUserStore();
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    removeLoggedUser();
    navigate("/login");
  };

  return {
    currentUser,
    setCurrentUser,
    logoutUser,
    navigate,
  };
}
