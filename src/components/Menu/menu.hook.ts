import { useEffect, useState } from "react";

import { ResponseProps } from "../../pages/Login";
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
  const [menuOptions, setOptions] = useState<UserOptionsProps>({
    type: "",
    users: [],
    blog: undefined,
  });

  useEffect(() => {
    const userData: ResponseProps =
      typeof window !== "undefined"
        ? JSON.parse(localStorage?.getItem("user") || "")
        : "";
    setOptions(getMenuOptions(userData.role));
  }, []);

  return {
    menuOptions,
    pathName: pathname,
  };
};

export default useMenu;
