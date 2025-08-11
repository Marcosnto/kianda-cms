import { getNewsletterList, sendEmail } from "@/api/email";
import GenericEmail from "@/helpers/emails/template/generic-email";
import { useEffect, useState } from "react";
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
  const [resetForm, setResetForm] = useState(false);
  const email = getValues("emailContent");

  const {
    newsletterList,
    isLoading: isNewsLetterListLoading,
    error: getNewsLetterListErrors,
  } = getNewsletterList();

  const { sendEmailFn, isSendingEmail } = sendEmail();

  useEffect(() => {
    if (resetForm) {
      reset();
      setResetForm(false);
    }
  }, [resetForm]);

  const onSubmit = (data: SendEmailData) => {
    const emailsPool = newsletterList?.map(
      (subscriber: SubscriberType) => subscriber.email,
    );

    if (!emailsPool || emailsPool.length === 0) {
      console.error("No email addresses available to send.");
      return;
    }

    const getEmailContent = async () => {
      try {
        const htmlContent = await GenericEmail(data.emailContent);

        return htmlContent;
      } catch (error) {
        console.error("Error generating email content:", error);
        return "";
      }
    };

    getEmailContent().then((htmlContent) => {
      sendEmailFn({
        emailsPool,
        body: htmlContent,
        emailSubject: data.title,
        setResetForm: setResetForm,
      });
    });
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
    resetForm,
  };
};
