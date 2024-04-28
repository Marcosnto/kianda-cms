import { Center } from "@chakra-ui/react";
import { create } from "zustand";

import { UserProps } from "./utils/types/user";

type Store = {
  currentComponent: JSX.Element;
  previousComponent: {
    component: JSX.Element;
  } | null;
  currentSelectedUser?: UserProps | undefined;
  setCurrentSelectedUser: (user: UserProps) => void;
  setComponent: (component: JSX.Element | undefined, user?: UserProps) => void;
};

const useStore = create<Store>()((set) => ({
  currentComponent: <Center h="80vh">Boas vindas!</Center>,
  previousComponent: null,
  currentSelectedUser: undefined,
  setCurrentSelectedUser: (user) => set(() => ({ currentSelectedUser: user })),
  setComponent: (component, user) =>
    set((state) => ({
      currentComponent: component,
      previousComponent: {
        component: state.currentComponent,
      },
      currentSelectedUser: user,
    })),
}));

export default useStore;
