import { Html } from "@react-email/html";
import { render } from "@react-email/render";

//TODO: Add an button to set the password
export default function AdminRegisterEmail({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  const renderedEmail = render(
    <Html lang="pt-BR">
      <h2>Boas vindas, {name}! </h2>
      <p>
        Seu registro em nossa plataforma foi realizado e você pode acessa-la
        utilizando o seu email e a senha informada abaixo:
        <br />
        <div style={{ textAlign: "center", width: "100%" }}>{password}</div>
        <p>
          Após entrar na plataforma, por favor, realize a troca da sua senha!
        </p>
      </p>
    </Html>,
  );

  return renderedEmail;
}
