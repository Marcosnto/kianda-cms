import { useEffect, useState } from "react";

import { ResponseProps } from "../../pages/Login";
import useStore from "../../store";
import getMenuOptions from "../../utils/mocks/menuOptionsPermitions";
import { OptionsProps } from "./MenuOptions";

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
