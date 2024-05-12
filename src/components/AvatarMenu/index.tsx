import { ResponseProps } from "@/pages/Login/types";
import { useRouter } from "@/utils/libs/routerFacade";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";

type AvatarMenuProps = {
  icon: React.ReactElement;
  content: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function AvatarMenu() {
  const [currentUser, setCurrentUser] = useState({ user_display_name: "" });
  const navigate = useRouter();

  useEffect(() => {
    const currentUser: ResponseProps = JSON.parse(
      localStorage.getItem("user") || "",
    );

    setCurrentUser(currentUser);
  }, []);

  function MenuItemComponent({ icon, content, onClick }: AvatarMenuProps) {
    return (
      <MenuItem
        _hover={{ bg: "green.600", rounded: "8px", color: "white" }}
        icon={icon}
        onClick={onClick}
        mt="1"
      >
        {content}
      </MenuItem>
    );
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <span data-testid="menuAvatar">
      <Menu>
        <MenuButton
          as={Avatar}
          aria-label="Opções do usuário"
          icon={
            <Avatar
              name={currentUser.user_display_name}
              src="https://store.playstation.com/store/api/chihiro/00_09_000/container/BR/pt/19/UP2477-CUSA06694_00-AV00000000000039/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000"
            />
          }
          variant="outline"
        />
        <MenuList sx={{ color: "black", padding: "2" }}>
          {/* TODO: Página de perfil para info e redefinir senha  */}
          {/* {MenuItemComponent({ icon: <AddIcon />, content: "Ver Perfil" })}
          {MenuItemComponent({
            icon: <LockIcon />,
            content: "Redefinir Senha",
          })} */}
          {MenuItemComponent({
            icon: <ArrowForwardIcon />,
            content: "Sair",
            onClick: () => logout(),
          })}
        </MenuList>
      </Menu>
    </span>
  );
}
