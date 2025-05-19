import { useLocation } from "react-router-dom";
import getMenuOptions from "./utils/menuOptionsPermitions";
import { OptionsProps } from "./MenuOptions";
import useStore from "@/store";

export type UserOptionsProps = {
  type: string;
  users?: Array<OptionsProps>;
  blog?: Array<OptionsProps>;
  admin?: Array<OptionsProps>;
};

const useMenu = () => {
  const { pathname } = useLocation();
  const store = useStore();
  console.log(store);
  const user = localStorage?.getItem("user");
  let menuOptions;

  //TODO: Improve this way to get the options
  if (window && user) {
    const userData = JSON.parse(user);
    menuOptions = getMenuOptions(userData.role);
  }

  return {
    pathName: pathname,
    menuOptions,
  };
};

export default useMenu;
