import { AddIcon, ArrowForwardIcon, LockIcon } from "@chakra-ui/icons";
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import useAvatarMenu from "./avatar-menu.hook";
import useUserStore from "@/store/userStore";
import defaultImage from "/assets/images/default_profile.jpg";

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
  const { currentUser, logoutUser, navigate } = useAvatarMenu();
  const { loggedUser } = useUserStore();

  return (
    <span data-testid="menuAvatar">
      <Menu>
        <MenuButton
          as={Avatar}
          aria-label="Opções do usuário"
          icon={
            <Avatar
              name={currentUser?.user_display_name}
              src={loggedUser?.avatar ? loggedUser?.avatar : defaultImage}
            />
          }
          variant="outline"
        />
        <MenuList sx={{ color: "black", padding: "2" }}>
          {MenuItemComponent({
            icon: <AddIcon />,
            content: "Ver Perfil",
            onClick: () => navigate("profile", { relative: "path" }),
          })}
          {MenuItemComponent({
            icon: <LockIcon />,
            content: "Trocar Senha",
            onClick: () => navigate("change-password", { relative: "path" }),
          })}
          {MenuItemComponent({
            icon: <ArrowForwardIcon />,
            content: "Sair",
            onClick: () => logoutUser(),
          })}
        </MenuList>
      </Menu>
    </span>
  );
}
