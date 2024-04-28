import {
  IoCreateOutline,
  IoEyeOutline,
  IoLockOpenOutline,
  IoTrashBinOutline,
} from "react-icons/io5";

import EditBlogPost from "../../components/Forms/Blog/Edit";
import EditRegister from "../../components/Forms/User/EditRegister";
import { EditTerapheuticContract } from "../../components/Forms/User/TerapheuticContract/Edit/EditTerapheuticContract";

export const userListOptions = [
  {
    key: "register-details",
    ariaLabel: "Visualizar cadastro",
    toolTipMessage: "Visualizar cadastro",
    icon: <IoEyeOutline />,
    component: <EditRegister />,
    isModal: false,
  },
  {
    key: "update-register-status",
    ariaLabel: "Alterar situação cadastral",
    toolTipMessage: "Alterar situação cadastral",
    icon: <IoLockOpenOutline />,
    component: <></>,
    isModal: true,
  },
  {
    key: "suspend-register",
    ariaLabel: "Suspender cadastro",
    toolTipMessage: "Suspender cadastro",
    icon: <IoTrashBinOutline />,
    component: <></>,
    isModal: true,
  },
];

export const blogListOptions = [
  {
    key: "edit-article",
    ariaLabel: "Editar Artigo",
    toolTipMessage: "Editar Artigo",
    icon: <IoCreateOutline />,
    component: <EditBlogPost />,
    isModal: false,
  },
  {
    key: "create-article",
    ariaLabel: "Criar Artigo",
    toolTipMessage: "Criar Artigo",
    icon: <IoCreateOutline />,
    component: <></>,
    isModal: false,
  },
];

export const terapheuticContractListOptions = [
  {
    key: "consult-contract",
    ariaLabel: "Consultar contrato",
    toolTipMessage: "Consultar contrato",
    icon: <IoEyeOutline />,
    component: <EditTerapheuticContract />,
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
