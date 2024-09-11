// import { useToast } from "@chakra-ui/react";
// import { useMutation } from "@tanstack/react-query";
// import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
// import { getEmailTemplate } from "../getEmailTemplate";
// import { MAILERSEND_API_KEY } from "@/helpers/envs";

export type RecipientType = {
  email: string | undefined;
  name: string | undefined;
};

export type BodyType = {
  senderEmail: string;
  senderName: string;
  recepients: RecipientType[];
  template: string;
  subject: string;
  text?: string;
};

// const mailerSend = new MailerSend({
//   apiKey: MAILERSEND_API_KEY || "",
// });

// export function sendEmail({
//   senderEmail,
//   senderName,
//   recepients,
//   template,
//   subject,
//   text,
// }: BodyType) {
//   const sentFrom = new Sender(senderEmail, senderName);

//   const recipients = recepients.map(
//     (recepient) => new Recipient(recepient.email || "", recepient.name),
//   );

//   const emailHtml = getEmailTemplate(template, recepients, text);

//   const emailParams = new EmailParams()
//     .setFrom(sentFrom)
//     .setTo(recipients)
//     .setSubject(subject)
//     .setHtml(emailHtml);

//   return mailerSend.email.send(emailParams);
// }

const useSendEmailToUser = () => {
  // const toast = useToast();
  // const { mutate: sendEmailPost, isPending: isSendingEmail } = useMutation({
  //   mutationFn: ({
  //     senderEmail,
  //     senderName,
  //     recepients,
  //     subject,
  //     template,
  //     text,
  //   }: BodyType) =>
  //     sendEmail({
  //       senderEmail,
  //       senderName,
  //       recepients,
  //       template,
  //       subject,
  //       text,
  //     }),
  //   onSuccess: () =>
  //     toast({
  //       title: props.toastMessage,
  //       position: "top",
  //       status: "success",
  //       isClosable: true,
  //     }),
  //   onError: () => {
  //     toast({
  //       title: `Ocorreu um erro ao enviar o email!`,
  //       position: "top",
  //       status: "error",
  //       isClosable: true,
  //     });
  //   },
  // });
  // return { sendEmailPost, isSendingEmail };
};

export default useSendEmailToUser;
