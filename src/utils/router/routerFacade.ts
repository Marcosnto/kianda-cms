import { useNavigate } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();

  return navigate;
}
