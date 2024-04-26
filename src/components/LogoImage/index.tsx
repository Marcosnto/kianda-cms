import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export type LogoImage = {
  pathRedirect: string;
};

function LogoImage({ pathRedirect }: LogoImage) {
  return (
    <Link to={pathRedirect}>
      <Avatar
        size="2xl"
        name="Logotipo: nome kianda escrito em amarelo fundo verde escuro"
        src="/img/logo.png"
      />
    </Link>
  );
}

export default LogoImage;
