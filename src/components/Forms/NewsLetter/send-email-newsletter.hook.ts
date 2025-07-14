import { getNewsletterList, sendEmail } from "@/api/email";
import { useForm } from "react-hook-form";

type SubscriberType = {
  id: string;
  email: string;
  date_subscribed: string;
  status: string;
};

type SendEmailData = {
  emailContent: string;
  title: string;
};

export const useSendEmailNewsLetter = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors, isDirty },
  } = useForm<SendEmailData>({
    defaultValues: {
      emailContent: "",
      title: "",
    },
  });

  const email = getValues("emailContent");

  const {
    newsletterList,
    isLoading: isNewsLetterListLoading,
    error: getNewsLetterListErrors,
  } = getNewsletterList();

  const { sendEmailFn, isSendingEmail } = sendEmail();

  const onSubmit = (data: SendEmailData) => {
    const emailsPool = newsletterList?.map(
      (subscriber: SubscriberType) => subscriber.email,
    );
    sendEmailFn({
      emailsPool,
      body: data.emailContent,
      emailSubject: data.title,
    });
    reset();
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    control,
    errors,
    email,
    isDirty,
    newsletterList,
    isNewsLetterListLoading,
    getNewsLetterListErrors,
    isSendingEmail,
  };
};
