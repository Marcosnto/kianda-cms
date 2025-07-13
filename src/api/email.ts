import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useToast } from "@chakra-ui/react";

export function getNewsletterList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["newsletter"],
    queryFn: () =>
      axiosInstance.get(`newsletter/subscribers`).then((res) => {
        const { data } = res;
        return data;
      }),
  });

  return { newsletterList: data, isLoading, error };
}

export function sendEmail() {
  const toast = useToast();

  const { mutate: sendEmailFn, isPending: isSendingEmail } = useMutation({
    mutationFn: ({
      emailsPool,
      body,
      emailSubject,
    }: {
      body: string;
      emailsPool: string | string[];
      emailSubject: string;
    }) =>
      axiosInstance.post(`send-email`, {
        to: emailsPool,
        subject: emailSubject,
        html: body,
      }),
    onSuccess: () => {
      toast({
        title: `Email enviado com sucesso!`,
        position: "top",
        status: "success",
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: `Ocorreu um erro ao enviar o email!`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    },
  });

  return { sendEmailFn, isSendingEmail };
}
