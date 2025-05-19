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
  IoPeopleSharp,
  // IoCalendarOutline,
} from "react-icons/io5";

function getIcon(iconName: IconType) {
  return <Icon as={iconName} w="5" h="5" />;
}

function getID() {
  const user = localStorage.getItem("user");
  const { id } = user ? JSON.parse(user) : "";

  return id;
}

export default function getMenuOptions(role: string | undefined) {
  switch (role) {
    case "admin":
      return admin;
    case "patient":
      return patient;
    case "web_editor":
      return editor;
    default:
      return { type: "default" };
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
      displayName: "Lista de Pacientes",
      path: "psi/users-list/patient",
    },
    {
      key: "user-admin-03",
      icon: getIcon(IoBookOutline),
      displayName: "Contratos Terapêuticos",
      path: "psi/terapheutic-contracts",
    },
    // {
    //   key: "user-admin-04",
    //   icon: getIcon(IoCalendarOutline),
    //   displayName: "Calendário",
    //   path: "psi/schedule",
    // },
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
      displayName: "Lista de Artigos",
      path: "blog/articles",
    },
    {
      key: "admin-01",
      icon: getIcon(IoPeopleSharp),
      displayName: "Lista de Editores",
      path: "admin/users-list/blog_editor",
    },
  ],
  admin: [
    {
      key: "admin-01",
      icon: getIcon(IoPeopleSharp),
      displayName: "Lista de Usuários",
      path: "admin/users-list/all",
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
      path: "psi/edit-register",
    },
    {
      key: "user-patitent-02",
      icon: getIcon(IoBodyOutline),
      displayName: "Contrato Terapêutico",
      path: `psi/terapheutic-contracts/${getID()}`,
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

export const editor: UserOptionsProps = {
  type: "patient",
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
