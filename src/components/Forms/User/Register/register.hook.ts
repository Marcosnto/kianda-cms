import { sendEmail } from "@/api/email";
import { postUserRegister } from "@/api/user";
import AdminRegisterEmail from "@/helpers/emails/template/admin-register";
import { RegisterProps } from "@/utils/types/forms";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, UseFormGetValues, UseFormReset } from "react-hook-form";

export default function useRegisterHook({
  reset,
  isValid,
  getValues,
}: {
  reset: UseFormReset<RegisterProps>;
  isValid: boolean;
  getValues: UseFormGetValues<RegisterProps>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    postUserRegisterFn,
    isPostUserRegisterSucess,
    isPostUserRegisterPending,
    hasPostUserRegisterError,
  } = postUserRegister();

  const { sendEmailFn, isSendingEmail } = sendEmail();

  useEffect(() => {
    if (isPostUserRegisterSucess) {
      sendEmailFn({
        emailsPool: getValues("email"),
        body: AdminRegisterEmail({ name: getValues("fullName") }),
        emailSubject: "Seu cadastro no Kianda foi realizado!",
      });

      if (!isSendingEmail) reset();
    }
  }, [isPostUserRegisterSucess]);

  const onSubmit: SubmitHandler<RegisterProps> = useCallback(
    (data) => {
      if (isValid) {
        postUserRegisterFn(data);
      }
    },
    [isValid, postUserRegisterFn],
  );

  return {
    onSubmit,
    showPassword,
    setShowPassword,
    isPostUserRegisterPending,
    hasPostUserRegisterError,
  };
}
