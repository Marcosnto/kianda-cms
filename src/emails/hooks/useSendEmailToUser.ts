import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export type RecipientType = {
  email: string;
  name: string;
};

export type BodyType = {
  senderEmail: string;
  senderName: string;
  recepients: RecipientType[];
  template: string;
  subject: string;
  text: string;
};

const useSendEmailToUser = (props: { toastMessage: string }) => {
  const toast = useToast();

  const { mutate: sendEmailPost, isPending: isSendingEmail } = useMutation({
    mutationFn: ({
      senderEmail,
      senderName,
      recepients,
      subject,
      text,
    }: BodyType) =>
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail,
          senderName,
          recepients,
          subject,
          text,
        }),
      }),
    onSuccess: (response) => {
      if (response.ok) {
        toast({
          title: props.toastMessage,
          position: "top",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: `Ocorreu um erro ao enviar o email`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  return { sendEmailPost, isSendingEmail };
};

export default useSendEmailToUser;
