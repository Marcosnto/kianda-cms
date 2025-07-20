import { create } from "zustand";

export type UserProfileProps = {
  id: string | number;
  role: string;
  name: string;
  avatar?: string;
};

type UserStoreProps = {
  loggedUser: UserProfileProps | undefined;
  setLoggedUser: (user: UserProfileProps) => void;
  removeLoggedUser: () => void;
};

const useUserStore = create<UserStoreProps>((set) => ({
  loggedUser: undefined,
  setLoggedUser: (user) => set(() => ({ loggedUser: user })),
  removeLoggedUser: () => set(() => ({ setLoggedUser: undefined })),
}));

export default useUserStore;
