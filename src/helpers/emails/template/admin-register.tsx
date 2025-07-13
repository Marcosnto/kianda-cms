import { Html } from "@react-email/html";
import { render } from "@react-email/render";

export default function AdminRegisterEmail({ name }: { name: string }) {
  const renderedEmail = render(
    <Html lang="pt-BR">
      <h2>Boas vindas, {name}! </h2>
      <p>
        Seu registro em nossa plataforma foi realizado e você pode acessa-la
        utilizando o seu email e a senha informada abaixo:
        <br />
        <div style={{ textAlign: "center", width: "100%" }}>12345</div>
      </p>
    </Html>,
  );

  return renderedEmail;
}
