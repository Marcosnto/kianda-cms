import {
  IoCreateOutline,
  IoEyeOutline,
  IoLockOpenOutline,
  IoTrashBinOutline,
} from "react-icons/io5";

export const userListOptions = [
  {
    key: "register-details",
    from: "user",
    ariaLabel: "Visualizar cadastro",
    toolTipMessage: "Visualizar cadastro",
    icon: <IoEyeOutline />,
    route: (userID: string | number) => `${userID}`,
    isModal: false,
  },
  {
    key: "update-register-status",
    from: "user",
    ariaLabel: "Alterar situação cadastral",
    toolTipMessage: "Alterar situação cadastral",
    icon: <IoLockOpenOutline />,
    isModal: true,
  },
  {
    key: "suspend-register",
    from: "user",
    ariaLabel: "Suspender cadastro",
    toolTipMessage: "Suspender cadastro",
    icon: <IoTrashBinOutline />,
    isModal: true,
  },
];

export const terapheuticContractListOptions = [
  {
    key: "consult-contract",
    from: "terapheuticContract",
    ariaLabel: "Consultar contrato",
    toolTipMessage: "Consultar contrato",
    icon: <IoEyeOutline />,
    route: (contractID: string | number) =>
      `terapheutic-contracts/${contractID}`,
    isModal: false,
  },
];

export const blogListOptions = [
  {
    key: "edit-article",
    from: "blog",
    ariaLabel: "Editar Artigo",
    toolTipMessage: "Editar Artigo",
    route: (articleID: string | number) => `article/${articleID}`,
    icon: <IoCreateOutline />,
    isModal: false,
  },
];

export const userTableHeaders = [
  { name: "ID", key: "User-ID" },
  { name: "Nome", key: "User-Name" },
  { name: "Cadastro", key: "User-Status" },
  { name: "Ações", key: "User-Actions" },
];

export const blogTableHeaders = [
  { name: "ID", key: "Blog-ID" },
  { name: "Título", key: "Blog-Title" },
  { name: "Descrição", key: "Blog-Descriptin" },
  { name: "Situação", key: "Blog-Status" },
];

export const terapheuticContractTableHeaders = [
  { name: "ID", key: "TC-ID" },
  { name: "Nome", key: "TC-Name" },
  { name: "Status", key: "TC-Status" },
  { name: "Ações", key: "TC-Actions" },
];
