import { render } from "@react-email/render";
import EmailHTML from "../components/emailHTML";

export default async function GenericEmail(text: string) {
  const html = await await render(<EmailHTML body={text} />);

  return html;
}
