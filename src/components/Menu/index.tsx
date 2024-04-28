import { Divider, Flex, Heading } from "@chakra-ui/react";

import useMenu from "./menu.hook";
import MenuOptions from "./MenuOptions";

export type MenuProps = {
  onClose?: () => void;
};

export default function Menu({ onClose }: MenuProps) {
  const { menuOptions, setComponent } = useMenu();

  if (menuOptions.type == "") {
    return <></>;
  }

  return (
    <Flex flexDir="column" pt="4">
      {menuOptions.type ? (
        <Heading as="h3" size="sm" noOfLines={1} ml="3" mt="8">
          {menuOptions.type === "admin" ? "Pacientes" : "Menu"}
        </Heading>
      ) : null}

      {menuOptions.users?.map((option: any) => (
        <MenuOptions
          key={option.key}
          icon={option.icon}
          path={option.path}
          onClose={onClose}
          displayName={option.displayName}
        />
      ))}

      {menuOptions.blog ? (
        <>
          <Divider mt="8" />
          <Heading as="h3" size="sm" noOfLines={1} ml="3" mt="8">
            Blog
          </Heading>
        </>
      ) : null}
      {menuOptions.blog?.map((option: any) => (
        <MenuOptions
          key={option.key}
          icon={option.icon}
          path={option.path}
          onClose={onClose}
          displayName={option.displayName}
        />
      ))}
    </Flex>
  );
}
