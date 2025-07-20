import { fetchProfile } from "@/api/user";
import useUserStore from "@/store/userStore";
import { useEffect } from "react";

const useDashboard = () => {
  const {
    profileData,
    isFechSuccess,
    isFetchProfileLoading,
    fetchProfileError,
  } = fetchProfile();

  const { setLoggedUser } = useUserStore();

  useEffect(() => {
    if (isFechSuccess && profileData) {
      setLoggedUser(profileData);
    }
  }, [isFechSuccess, profileData, setLoggedUser]);

  return { isFechSuccess, isFetchProfileLoading, fetchProfileError };
};

export default useDashboard;
