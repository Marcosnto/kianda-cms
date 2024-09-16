import { useState } from "react";

import getMenuOptions from "../../helpers/menuOptionsPermitions";
import { OptionsProps } from "./MenuOptions";

export type UserOptionsProps = {
  type: string;
  users?: Array<OptionsProps>;
  blog?: Array<OptionsProps>;
};

const useMenu = () => {
  const user = localStorage?.getItem("user");
  let menuOptions;

  //TODO: Improve this way to get the options
  if (window && user) {
    const userData = JSON.parse(user);
    menuOptions = getMenuOptions(userData.role);
  }

  return {
    menuOptions,
  };
};

export default useMenu;
