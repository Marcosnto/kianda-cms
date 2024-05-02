import { useRouter } from "@/utils/libs/routerFacade";
import { Box } from "@chakra-ui/react";
import useMenu from "../menu.hook";

export type OptionsProps = {
  key: string;
  icon: JSX.Element;
  displayName: string;
  path: string;
};

export interface MenuOptionsProps extends OptionsProps {
  onClose?: () => void;
}

export default function MenuOptions({
  icon,
  displayName,
  path,
  onClose,
}: MenuOptionsProps) {
  const navigate = useRouter();
  const { pathName } = useMenu();
  const isActive = `/dashboard/${path}` === pathName;
  return (
    <Box
      bg={isActive ? "#eeeee4" : "white"}
      _hover={{
        bg: `${isActive ? "#eeeee4" : "green.600"}`,
        rounded: "2px",
        color: `${isActive ? "green.700" : "white"}`,
      }}
      as="button"
      display="flex"
      gap="3"
      alignItems="center"
      p="0.5rem 1rem 0.5rem 1rem "
      onClick={() => {
        navigate(path);
        onClose && onClose();
      }}
    >
      {icon}
      {displayName}
    </Box>
  );
}
