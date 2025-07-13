import { Html } from "@react-email/html";

export default function GenericEmail({ text }: { text?: string }) {
  return <Html lang="pt-BR">{text}</Html>;
}
