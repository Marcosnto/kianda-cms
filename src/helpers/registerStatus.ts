export const getRegisterStatus = (statusNumber: string | number) => {
  switch (String(statusNumber)) {
    case "0":
      return "Aguardando Aprovação";
    case "1":
      return "Aprovado";
    case "2":
      return "Suspenso";
    default:
      return "";
  }
};
