import { Box } from "@chakra-ui/react";

export type OptionsProps = {
  key: string;
  icon: JSX.Element;
  displayName: string;
  render?: JSX.Element;
};

export interface MenuOptionsProps extends OptionsProps {
  setCurrentComponent: (component: JSX.Element) => void;
  onClose?: () => void;
}

export default function MenuOptions({
  icon,
  displayName,
  render,
  setCurrentComponent,
  onClose,
}: MenuOptionsProps) {
  return (
    <Box
      _hover={{ bg: "green.600", rounded: "8px", color: "white" }}
      as="button"
      display="flex"
      gap="11px"
      alignItems="center"
      p="3"
      ml="4"
      mr="4"
      mt="2"
      onClick={() => {
        setCurrentComponent(render || <></>);
        onClose && onClose();
      }}
    >
      {icon}
      {displayName}
    </Box>
  );
}
