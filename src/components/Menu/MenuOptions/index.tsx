import { useRouter } from "@/utils/libs/routerFacade";
import { Box } from "@chakra-ui/react";

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
  return (
    <Box
      _hover={{ bg: "green.600", rounded: "8px", color: "white" }}
      as="button"
      display="flex"
      gap="3"
      alignItems="center"
      p="1.5"
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
