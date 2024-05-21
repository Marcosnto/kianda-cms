import { useState } from "react";

import getMenuOptions from "../../utils/mocks/menuOptionsPermitions";
import { OptionsProps } from "./MenuOptions";
import { useLocation } from "@/utils/libs/routerFacade";

export type UserOptionsProps = {
  type: string;
  users?: Array<OptionsProps>;
  blog?: Array<OptionsProps>;
};

const useMenu = () => {
  const { pathname } = useLocation();
  const user = localStorage?.getItem("user");
  const [menuOptions, setOptions] = useState<UserOptionsProps>({
    type: "",
    users: [],
    blog: undefined,
  });
  //TODO: Improve this way to get the options
  if (window && user && menuOptions.users?.length == 0) {
    const userData = JSON.parse(user);
    setOptions(getMenuOptions(userData.role));
  }

  return {
    menuOptions,
    pathName: pathname,
  };
};

export default useMenu;
