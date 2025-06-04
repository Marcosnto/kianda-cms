// import { useMutation } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

// const { currentSelectedUser } = useStore();
// const { sendEmailPost, isSendingEmail } = useSendEmailToUser({
//   toastMessage: "Alteração realizada com sucesso",
// });

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

// const { mutate: sendEmailPost, isPending: isSendingEmail } = useMutation({
//   mutationFn: (data: Partial<RegisterProps>) =>
//     sendEmail({
//       senderEmail: "teste@kiandadiversidade.com",
//       senderName: "Kianda",
//       recepients: [{ email: data.email, name: data.fullName }],
//       template: "auto-register",
//       subject: "Cadastro realizado com sucesso!",
//     }),
//   onSuccess: () => {
//     setModalStatus.on();
//   },
//   onError: () => {
//     toast({
//       title: `Ocorreu um erro ao enviar o email!`,
//       position: "top",
//       status: "error",
//       isClosable: true,
//     });
//   },
// });

// const sendEditRegisterEmail = useCallback(
//   ({ fullName, email }: { fullName: string; email: string }) => {
//     sendEmailPost({
//       senderEmail: "teste@kiandadiversidade.com",
//       senderName: "Kianda",
//       recepients: [
//         {
//           email: email || currentSelectedUser?.email || "",
//           name: fullName || currentSelectedUser?.fullName || "",
//         },
//       ],
//       template: "",
//       subject: "Cadastro alterado!",
//       text: "Seu cadastro foi alterado. :)",
//     });
//   },
//   [currentSelectedUser?.email, currentSelectedUser?.fullName, sendEmailPost],
// );
