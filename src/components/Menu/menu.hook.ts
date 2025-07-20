import { useLocation } from "react-router-dom";
import getMenuOptions from "../../helpers/menuOptionsPermitions";
import { OptionsProps } from "./MenuOptions";
import useUserStore from "@/store/userStore";

export type UserOptionsProps = {
  type: string;
  users?: Array<OptionsProps>;
  blog?: Array<OptionsProps>;
  admin?: Array<OptionsProps>;
};

const useMenu = () => {
  const { pathname } = useLocation();
  const { loggedUser } = useUserStore();
  let menuOptions;

  if (window && loggedUser) {
    menuOptions = getMenuOptions(loggedUser.role);
  }

  return {
    pathName: pathname,
    menuOptions,
  };
};

export default useMenu;
