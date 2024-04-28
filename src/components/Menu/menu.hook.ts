import { useEffect, useState } from "react";

import getMenuOptions from "../../utils/mocks/menuOptionsPermitions";
import { ResponseProps } from "../../pages/Login";
import { OptionsProps } from "./MenuOptions";
import useStore from "../../store";

export type UserOptionsProps = {
  type: string;
  users?: Array<OptionsProps>;
  blog?: Array<OptionsProps>;
};

const useMenu = () => {
  const { setComponent } = useStore();
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
    setComponent,
  };
};

export default useMenu;
