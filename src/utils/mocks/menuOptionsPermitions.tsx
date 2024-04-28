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

import Post from "../../components/Forms/Blog/Post";
import UserRegister from "../../components/Forms/User/Register";
import { EditTerapheuticContract } from "../../components/Forms/User/TerapheuticContract/Edit/EditTerapheuticContract";
import PostsList from "../../components/List/Blog";
import TerapheuticContractsList from "../../components/List/TerapheuticContract";
import UsersList from "../../components/List/User";
import { UserOptionsProps } from "../../components/Menu/menu.hook";

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
      render: <UserRegister />,
    },
    {
      key: "user-admin-02",
      icon: getIcon(IoPeopleOutline),
      displayName: "Listar Pacientes",
      render: <UsersList />,
    },
    {
      key: "user-admin-03",
      icon: getIcon(IoBookOutline),
      displayName: "Contratos Terapêuticos",
      render: <TerapheuticContractsList />,
    },
  ],
  blog: [
    {
      key: "blog-admin-01",
      icon: getIcon(IoDocumentTextOutline),
      displayName: "Escrever Artigo",
      render: <Post />,
    },
    {
      key: "blog-admin-02",
      icon: getIcon(IoFolderOutline),
      displayName: "Listar Artigos",
      render: <PostsList />,
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
      render: <h1>Dados pessoais</h1>,
    },
    {
      key: "user-patitent-02",
      icon: getIcon(IoBodyOutline),
      displayName: "Contrato Terapêutico",
      render: <EditTerapheuticContract />,
    },
    {
      key: "user-patitent-03",
      icon: getIcon(IoCalendarNumberOutline),
      displayName: "Consultas",
      render: <h1>Consultas</h1>,
    },
    {
      key: "user-patitent-04",
      icon: getIcon(IoWalletOutline),
      displayName: "Recibos",
      render: <h1>Recibos</h1>,
    },
  ],
};
