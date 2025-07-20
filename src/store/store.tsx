import { create } from "zustand";

import { UserProps } from "./utils/types/user";

type Store = {
  lastPath?: string;
  previousComponent: {
    component: JSX.Element;
  } | null;
  currentSelectedUser?: UserProps | undefined;
  setCurrentSelectedUser: (user: UserProps) => void;
};

const useStore = create<Store>()((set) => ({
  previousComponent: null,
  currentSelectedUser: undefined,
  setCurrentSelectedUser: (user) => set(() => ({ currentSelectedUser: user })),
}));

export default useStore;
