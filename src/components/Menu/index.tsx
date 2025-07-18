import { Box, Divider, Flex, Heading } from "@chakra-ui/react";

import useMenu from "./menu.hook";
import MenuOptions from "./MenuOptions";
import { TbMoodEmpty } from "react-icons/tb";

export type MenuProps = {
  onClose?: () => void;
};

export default function Menu({ onClose }: MenuProps) {
  const { menuOptions } = useMenu();

  if (menuOptions?.type === "default" || !menuOptions) {
    return (
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        gap="2"
        px="4"
      >
        <TbMoodEmpty size={25} />
        <p>Não há opções para serem exibidas</p>
      </Box>
    );
  }

  return (
    <Flex
      flexDir="column"
      pt="5"
      pl="5"
      gap="1rem"
      flexBasis="26ch"
      flexShrink="0"
    >
      {menuOptions.users && menuOptions.users?.length > 0 && (
        <>
          {menuOptions.type ? (
            <Heading as="h3" size="sm" noOfLines={1}>
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
          <Divider mt="8" />
        </>
      )}

      {menuOptions.blog && menuOptions.blog?.length > 0 && (
        <>
          {menuOptions.blog ? (
            <>
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
          <Divider mt="8" />
        </>
      )}

      {menuOptions.admin && menuOptions.admin?.length > 0 && (
        <>
          {menuOptions.admin ? (
            <Heading as="h3" size="sm" noOfLines={1} ml="3" mt="8">
              Administrador
            </Heading>
          ) : null}
          {menuOptions.admin?.map((option: any) => (
            <MenuOptions
              key={option.key}
              icon={option.icon}
              path={option.path}
              onClose={onClose}
              displayName={option.displayName}
            />
          ))}
        </>
      )}
    </Flex>
  );
}
