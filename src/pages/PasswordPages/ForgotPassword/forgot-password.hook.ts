import { useRouter } from "@/utils/libs/routerFacade";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useForgotPassword() {
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    console.log(data);

  return {
    navigate,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    isSubmitting,
  };
}
