import { Html } from "@react-email/html";
import { render } from "@react-email/render";

export default function AutoRegisterEmail({ name }: { name: string }) {
  const renderedEmail = render(
    <Html lang="pt-BR">
      <h2>Boas vindas, {name}! </h2>
      <p>
        Seu cadastro foi realizado com sucesso e está pendente de aprovação!
        <br />
        Você receberá outro email com o resultado assim que seu cadastro for
        analisado.
      </p>
    </Html>,
  );

  return renderedEmail;
}
