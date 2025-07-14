import { getRegisterStatus } from "@/utils/registerStatus";
import { Html } from "@react-email/html";
import { render } from "@react-email/render";

export default function UpdatedUser({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  const renderedEmail = render(
    <Html lang="pt-BR">
      <h2>{`Olá, ${name}! `}</h2>
      <p>
        Seu cadastro na plataforma Kianda foi atualizado e agora se encontra
        como: <b>{`${getRegisterStatus(status)}`}</b>
      </p>
    </Html>,
  );

  return renderedEmail;
}
