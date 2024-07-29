import { TableOptionsType } from "@/components/Table/table.types";
import useStore from "@/store";
import { useRouter } from "@/utils/libs/routerFacade";
import { UserProps } from "@/utils/types/user";
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";

export type ButtonActionsProps = TableOptionsType & {
  user: UserProps;
};

type IconButtonFunctionType = {
  route?: ((params: string | number) => string) | string;
  user: UserProps;
  from: string;
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
  const navigate = useRouter();

  const setModalFunction = useCallback(
    (key: string, user: UserProps) => {
      if (user) setCurrentSelectedUser(user);
      if (modalsOptions) modalsOptions[key](user?.registerStatus || "");
    },
    [setCurrentSelectedUser, modalsOptions],
  );

  const setIconRedirect = useCallback((props: IconButtonFunctionType) => {
    const { user, route, from } = props;

    function getRoutePath(id: string | number) {
      return typeof route == "function" ? route(id) : route;
    }

    switch (from) {
      case "user":
        setCurrentSelectedUser(user);
        const routeUserPath = getRoutePath(user.id);
        navigate(`../${routeUserPath}`, { relative: "path" });
        break;

      case "terapheuticContract":
        const routeContractPath = getRoutePath(user.id);
        navigate(`../${routeContractPath}`, { relative: "path" });
        break;

      case "blog":
        break;

      default:
        break;
    }
  }, []);

  const getIconButton = useCallback(
    ({
      key,
      from,
      route,
      ariaLabel,
      toolTipMessage,
      icon,
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
                : setIconRedirect({ route, user, from })
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
          route: icon.route,
          isModal: icon.isModal,
          from: icon.from,
          user,
        }),
      )}
    </Stack>
  );
}
