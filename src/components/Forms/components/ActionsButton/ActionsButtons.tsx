import useStore from "@/store";
import { UserProps } from "@/utils/types/user";
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";

export type ButtonActionsProps = TableOptionsType & {
  user: UserProps;
};

export type TableOptionsType = {
  key: string;
  ariaLabel: string;
  toolTipMessage: string;
  icon: React.ReactElement;
  component: JSX.Element;
  isModal: boolean;
};

export default function ButtonsActions({
  user,
  modalsOptions,
  tableOptions,
}: {
  user: UserProps;
  modalsOptions?: { [key: string]: (...arg0: string[]) => void } | undefined;
  tableOptions: TableOptionsType[];
}) {
  const { setComponent, setCurrentSelectedUser } = useStore();

  const setModalFunction = useCallback(
    (key: string, user: UserProps) => {
      if (user) setCurrentSelectedUser(user);
      if (modalsOptions) modalsOptions[key](user?.registerStatus || "");
    },
    [setCurrentSelectedUser, modalsOptions],
  );

  const getIconButton = useCallback(
    ({
      key,
      ariaLabel,
      toolTipMessage,
      icon,
      component,
      isModal,
      user,
    }: ButtonActionsProps) => {
      return (
        <Tooltip
          label={toolTipMessage}
          aria-label="A tooltip"
          placement="top"
          key={key}
        >
          <IconButton
            w="8"
            h="8"
            fontSize="18"
            variant="outline"
            aria-label={ariaLabel}
            icon={icon}
            onClick={() =>
              isModal
                ? setModalFunction(key, user)
                : setComponent(component, user)
            }
            border="solid 1px #35481E"
            _hover={{ bg: "green.600", rounded: "8px", color: "white" }}
          />
        </Tooltip>
      );
    },
    [setComponent, setModalFunction],
  );

  return (
    <Stack spacing={2} direction="row">
      {tableOptions.map((icon) =>
        getIconButton({
          key: icon.key,
          ariaLabel: icon.ariaLabel,
          toolTipMessage: icon.toolTipMessage,
          icon: icon.icon,
          component: icon.component,
          isModal: icon.isModal,
          user,
        }),
      )}
    </Stack>
  );
}
