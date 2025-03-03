import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
// import { useCallback } from "react";

import useUpdateUserRegister from "./useUpdateUserRegister";
// import useStore from "@/store";
// import useSendEmailToUser from "@/emails/hooks/useSendEmailToUser";
import { UpdateRegister } from "@/components/Forms/User/EditRegister/EditRegisterForm.types";
import { BASE_API_URL } from "@/helpers/envs";

const useUpdateUserStatus = () => {
  const token = localStorage.getItem("token");
  const toast = useToast();
  // const { currentSelectedUser } = useStore();
  // const { sendEmailPost, isSendingEmail } = useSendEmailToUser({
  //   toastMessage: "Alteração realizada com sucesso",
  // });
  const { updateUserRegisterMutation, updateUserRegisterLoading } =
    useUpdateUserRegister();

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

  const { mutate: updateUserStatusMutation, isPending: isUpdateUserPeding } =
    useMutation({
      mutationFn: ({ id, fullName, email, registerStatus }: UpdateRegister) =>
        fetch(BASE_API_URL + "/user/update-status" || "", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            fullName,
            email,
            registerStatus,
          }),
        }),
      onSuccess: (response, variables) => {
        // const { fullName, email, sendEmail } = variables;
        if (response.ok) {
          // if (sendEmail) {
          //   sendEditRegisterEmail({
          //     fullName: fullName || "",
          //     email: email || "",
          //   });
          // }
          updateUserRegisterMutation({ ...variables });
        } else {
          toast({
            title: `Ocorreu um erro no servidor`,
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
      },
    });

  return {
    updateUserStatusMutation,
    isUpdateUserPeding,
    // isSendingEmail,
    updateUserRegisterLoading,
  };
};

export default useUpdateUserStatus;
