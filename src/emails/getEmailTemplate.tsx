import { render } from "@react-email/render";

import { RecipientType } from "./hooks/useSendEmailToUser";
import AdminRegisterEmail from "./template/admin-register";
import AutoRegisterEmail from "./template/auto-register-email";
import GenericEmail from "./template/generic-email";

export const getEmailTemplate = (
  emailTemplate: string,
  recepients: RecipientType[],
  text?: string,
): string => {
  let emailComponent = <></>;

  switch (emailTemplate) {
    case "auto-register":
      emailComponent = <AutoRegisterEmail recepients={recepients} />;
      break;
    case "admin-register":
      emailComponent = <AdminRegisterEmail recepients={recepients} />;
      break;
    default:
      emailComponent = <GenericEmail text={text} />;
      break;
  }

  return render(emailComponent);
};
