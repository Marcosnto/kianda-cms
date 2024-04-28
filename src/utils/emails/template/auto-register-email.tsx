import { Html } from "@react-email/html";
import { RecipientType } from "../hooks/useSendEmailToUser";

export default function AutoRegisterEmail({
  recepients,
}: {
  recepients: RecipientType[];
}) {
  const { name } = recepients[0];

  return (
    <Html lang="pt-BR">
      <h2>Boas vindas, {name}! </h2>
      <p>
        Seu cadastro foi realizado com sucesso e está pendente de aprovação!
        <br />
        Você receberá um aviso assim que seu cadastro for analisado.
      </p>
    </Html>
  );
}
