type RegisterTypes = {
  id: string;
  name: string;
};

const registerTypes: Array<RegisterTypes> = [
  {
    id: "admin",
    name: "Administrador",
  },
  {
    id: "patient",
    name: "Paciente",
  },
  {
    id: "psi-support",
    name: "Suporte",
  },
  {
    id: "blog_editor",
    name: "Editor",
  },
];

export default registerTypes;
