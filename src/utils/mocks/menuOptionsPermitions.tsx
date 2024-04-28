import { UserOptionsProps } from "@/components/Menu/menu.hook";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  IoBodyOutline,
  IoBookOutline,
  IoCalendarNumberOutline,
  IoCreateOutline,
  IoDocumentTextOutline,
  IoFolderOutline,
  IoPeopleOutline,
  IoWalletOutline,
} from "react-icons/io5";

function getIcon(iconName: IconType) {
  return <Icon as={iconName} w="5" h="5" />;
}

export default function getMenuOptions(role: string | undefined) {
  switch (role) {
    case "admin":
      return admin;
    case "patient":
      return patient;
    default:
      return { type: "default", users: [] };
  }
}

export const admin: UserOptionsProps = {
  type: "admin",
  users: [
    {
      key: "user-admin-01",
      icon: getIcon(IoBodyOutline),
      displayName: "Cadastrar Paciente",
      path: "psi/user-register",
    },
    {
      key: "user-admin-02",
      icon: getIcon(IoPeopleOutline),
      displayName: "Listar Pacientes",
      path: "psi/patients",
    },
    {
      key: "user-admin-03",
      icon: getIcon(IoBookOutline),
      displayName: "Contratos Terapêuticos",
      path: "psi/terapheutic-contracts",
    },
  ],
  blog: [
    {
      key: "blog-admin-01",
      icon: getIcon(IoDocumentTextOutline),
      displayName: "Escrever Artigo",
      path: "blog/create-article",
    },
    {
      key: "blog-admin-02",
      icon: getIcon(IoFolderOutline),
      displayName: "Listar Artigos",
      path: "blog/articles",
    },
  ],
};

export const patient: UserOptionsProps = {
  type: "patient",
  users: [
    {
      key: "user-patitent-01",
      icon: getIcon(IoCreateOutline),
      displayName: "Dados Pessoais",
      path: "",
    },
    {
      key: "user-patitent-02",
      icon: getIcon(IoBodyOutline),
      displayName: "Contrato Terapêutico",
      path: "",
    },
    {
      key: "user-patitent-03",
      icon: getIcon(IoCalendarNumberOutline),
      displayName: "Consultas",
      path: "",
    },
    {
      key: "user-patitent-04",
      icon: getIcon(IoWalletOutline),
      displayName: "Recibos",
      path: "",
    },
  ],
};
