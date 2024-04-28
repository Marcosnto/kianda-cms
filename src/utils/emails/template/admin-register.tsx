import { Html } from "@react-email/html";
import { RecipientType } from "../hooks/useSendEmailToUser";

export default function AdminRegisterEmail({
  recepients,
}: {
  recepients: RecipientType[];
}) {
  const { name } = recepients[0];

  return (
    <Html lang="pt-BR">
      <h2>Boas vindas, {name}! </h2>
      <p>
        Seu registro em nossa plataforma foi realizado e você pode acessa-la
        utilizando o seu email e a senha informada abaixo:
        <br />
        <div style={{ textAlign: "center", width: "100%" }}>12345</div>
      </p>
    </Html>
  );
}
