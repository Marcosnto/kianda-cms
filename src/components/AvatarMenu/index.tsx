import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import useAvatarMenu from "./avatar-menu.hook";

type AvatarMenuProps = {
  icon: React.ReactElement;
  content: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

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

export default function AvatarMenu() {
  const { currentUser, logout, navigate } = useAvatarMenu();

  return (
    <span data-testid="menuAvatar">
      <Menu>
        <MenuButton
          as={Avatar}
          aria-label="Opções do usuário"
          icon={
            <Avatar
              name={currentUser?.user_display_name}
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
            onClick: () => {
              logout();
              //TODO: Understand why the navite to / don't working
              navigate(0);
            },
          })}
        </MenuList>
      </Menu>
    </span>
  );
}
